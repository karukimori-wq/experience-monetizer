import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title:'経験マネタイザー', description:'あなたの普通の経験を、副業の可能性に変える。' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ja"><body>{children}</body></html>; }
