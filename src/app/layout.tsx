import type { Metadata } from 'next';
import './globals.css';
import './theme.css';
import AppBottomNav from './AppBottomNav';

export const metadata: Metadata = { title:'経験マネタイザー', description:'あなたの普通の経験を、副業の可能性に変える。' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ja"><body>{children}<AppBottomNav/></body></html>; }
