import type { Metadata } from 'next';
import './globals.css';
import './theme.css';
import './skill-profile.css';
import './roadmap.css';
import AppBottomNav from './AppBottomNav';

export const metadata: Metadata = { title:'経験マネタイザー', description:'経験と行動をスキルとして可視化し、最適な副業と次の一歩を提案する。' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ja"><body>{children}<AppBottomNav/></body></html>; }
