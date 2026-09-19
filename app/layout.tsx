import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DocumentProvider } from '@/context/DocumentContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NyayaLens — AI Legal Document Understanding & Assistance',
  description: 'Understand legal documents with clarity. AI-powered simplification, clause intelligence, timeline forecasting, grounded Q&A, and lawyer consultation prep.',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        <DocumentProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </DocumentProvider>
      </body>
    </html>
  );
}
