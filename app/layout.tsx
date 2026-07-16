import Link from 'next/link';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

// Şriftləri bura əlavə edirik (Identity Kit-ə uyğun)
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-jakarta' 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={`${inter.variable} ${jakarta.variable}`}>
      {/* Arxa fonu Slate-50 (#F8FAFC) və yazı rəngini Slate-900 (#0F172A) edirik */}
      <body className="bg-[#F8FAFC] text-[#0F172A] font-sans min-h-screen flex flex-col">
        {/* Üst Naviqasiya Menyusu */}
        <nav className="bg-white border-b border-[#E2E8F0] p-4 flex gap-6 justify-center">
          <Link href="/" className="hover:text-[#2563EB] font-semibold transition-colors">Home</Link>
          <Link href="/kanban" className="hover:text-[#2563EB] font-semibold transition-colors">Kanban Board</Link>
          <Link href="/settings" className="hover:text-[#2563EB] font-semibold transition-colors">Settings</Link>
          <Link href="/health" className="hover:text-[#2563EB] font-semibold transition-colors">Health Check</Link>
        </nav>
        
        {/* Səhifələrin məzmunu */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}