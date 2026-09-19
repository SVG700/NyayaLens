import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { DocumentProvider, useDocument } from '@/context/DocumentContext';
import { DEMO_EMPLOYMENT_AGREEMENT } from '@/lib/mockData';

// Test consumer component
const TestConsumer = () => {
  const {
    currentDocument,
    loadDemoDocument,
    toggleChecklistItem,
    addCustomChecklistItem
  } = useDocument();

  return (
    <div>
      <div data-testid="doc-name">{currentDocument.name}</div>
      <div data-testid="doc-id">{currentDocument.id}</div>
      <div data-testid="checklist-count">{currentDocument.checklist.length}</div>
      <div data-testid="first-item-completed">
        {currentDocument.checklist[0]?.completed ? 'true' : 'false'}
      </div>

      <button
        data-testid="load-employment"
        onClick={() => loadDemoDocument(DEMO_EMPLOYMENT_AGREEMENT.id)}
      >
        Load Employment
      </button>

      <button
        data-testid="toggle-first"
        onClick={() => toggleChecklistItem(currentDocument.checklist[0]?.id)}
      >
        Toggle First
      </button>

      <button
        data-testid="add-item"
        onClick={() => addCustomChecklistItem('Verify tenant insurance policy', 'Pre-Signing')}
      >
        Add Item
      </button>
    </div>
  );
};

describe('DocumentContext & State Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default document state upon mounting', () => {
    render(
      <DocumentProvider>
        <TestConsumer />
      </DocumentProvider>
    );

    expect(screen.getByTestId('doc-name')).toHaveTextContent('Apartment Rental Agreement');
    expect(screen.getByTestId('doc-id')).toHaveTextContent('doc-rental-001');
    expect(Number(screen.getByTestId('checklist-count').textContent)).toBeGreaterThan(0);
  });

  it('switches document when loadDemoDocument is called', () => {
    render(
      <DocumentProvider>
        <TestConsumer />
      </DocumentProvider>
    );

    act(() => {
      screen.getByTestId('load-employment').click();
    });

    expect(screen.getByTestId('doc-name')).toHaveTextContent('Employment Agreement - Staff Engineer');
    expect(screen.getByTestId('doc-id')).toHaveTextContent('doc-employment-002');
  });

  it('toggles checklist item completed status', () => {
    render(
      <DocumentProvider>
        <TestConsumer />
      </DocumentProvider>
    );

    const initialStatus = screen.getByTestId('first-item-completed').textContent;

    act(() => {
      screen.getByTestId('toggle-first').click();
    });

    const toggledStatus = screen.getByTestId('first-item-completed').textContent;
    expect(toggledStatus).not.toBe(initialStatus);

    act(() => {
      screen.getByTestId('toggle-first').click();
    });

    expect(screen.getByTestId('first-item-completed').textContent).toBe(initialStatus);
  });

  it('adds custom checklist items to the active document', () => {
    render(
      <DocumentProvider>
        <TestConsumer />
      </DocumentProvider>
    );

    const initialCount = Number(screen.getByTestId('checklist-count').textContent);

    act(() => {
      screen.getByTestId('add-item').click();
    });

    const newCount = Number(screen.getByTestId('checklist-count').textContent);
    expect(newCount).toBe(initialCount + 1);
  });

  it('throws an error when useDocument is invoked outside DocumentProvider', () => {
    const InvalidConsumer = () => {
      useDocument();
      return null;
    };

    // Suppress console.error during expected throw
    const originalConsoleError = console.error;
    console.error = () => {};

    expect(() => render(<InvalidConsumer />)).toThrow(
      'useDocument must be used within a DocumentProvider'
    );

    console.error = originalConsoleError;
  });
});
