'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDocument } from '@/context/DocumentContext';
import {
  Scale,
  LayoutDashboard,
  FileSearch,
  GitCompare,
  MessageSquare,
  Calendar,
  CheckSquare,
  Settings,
  Bell,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALL_DEMO_DOCUMENTS } from '@/lib/mockData';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentDocument, loadDemoDocument } = useDocument();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (demoMenuOpen) setDemoMenuOpen(false);
        if (showNotifications) setShowNotifications(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [demoMenuOpen, showNotifications, mobileMenuOpen]);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze', href: '/analyze', icon: FileSearch },
    { name: 'Compare', href: '/compare', icon: GitCompare },
    { name: 'Ask Document', href: '/ask', icon: MessageSquare },
    { name: 'Timeline', href: '/timeline', icon: Calendar },
    { name: 'Checklist', href: '/checklist', icon: CheckSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <Scale className="w-5 h-5 text-indigo-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-slate-950">
                    Nyaya<span className="text-indigo-600">Lens</span>
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Legal Understanding Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150',
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                    )}
                  >
                    <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-indigo-300' : 'text-slate-400')} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Demo Document Quick Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                aria-expanded={demoMenuOpen}
                aria-haspopup="menu"
                aria-controls="demo-menu-dropdown"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/70 transition shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Try Demo Document</span>
                <ChevronDown className="w-3 h-3 text-indigo-600" />
              </button>

              {demoMenuOpen && (
                <div
                  id="demo-menu-dropdown"
                  role="menu"
                  aria-label="Demo documents"
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-slide-up"
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    Select Demo Document
                  </div>
                  {ALL_DEMO_DOCUMENTS.map((doc) => (
                    <button
                      key={doc.id}
                      role="menuitem"
                      onClick={() => {
                        loadDemoDocument(doc.id);
                        setDemoMenuOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-indigo-50/60 transition',
                        currentDocument.id === doc.id ? 'bg-indigo-50/90 font-medium' : ''
                      )}
                    >
                      <span className="font-semibold text-slate-800">{doc.name}</span>
                      <span className="text-[11px] text-slate-600">{doc.type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-expanded={showNotifications}
                aria-haspopup="dialog"
                aria-controls="notifications-panel"
                className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition relative"
                aria-label={showNotifications ? 'Close notifications' : 'Open notifications'}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div
                  id="notifications-panel"
                  role="region"
                  aria-label="Notifications"
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-slide-up"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <span className="text-[10px] text-indigo-600 font-medium">3 new</span>
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="text-xs p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
                      <p className="font-semibold text-slate-900">Analysis Completed</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Apartment Rental Agreement analyzed with 5 key review items.
                      </p>
                    </div>
                    <div className="text-xs p-2 rounded-lg bg-amber-50/50 border border-amber-100">
                      <p className="font-semibold text-amber-900">Notice Window Alert</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Upcoming 30-day notice window milestone scheduled for Oct 31, 2026.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Link */}
            <Link
              href="/settings"
              className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* User Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-slate-100">
                AP
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            className="lg:hidden py-3 border-t border-slate-200 space-y-1 animate-slide-up"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg',
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  loadDemoDocument();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-900"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Try Demo Document
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
