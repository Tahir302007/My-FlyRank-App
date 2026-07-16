import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {/* Üst Naviqasiya Menyusu */}
        <nav className="bg-white border-b p-4 flex gap-6 justify-center">
          <Link href="/" className="hover:text-blue-600 font-medium">Home</Link>
          <Link href="/settings" className="hover:text-blue-600 font-medium">Settings</Link>
          <Link href="/health" className="hover:text-blue-600 font-medium">Health Check</Link>
        </nav>
        
        {/* Səhifələrin məzmunu */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}