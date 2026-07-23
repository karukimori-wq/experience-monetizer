'use client';

import {usePathname} from 'next/navigation';

const items=[
  {href:'/',label:'ホーム',icon:'⌂'},
  {href:'/jobs',label:'探す',icon:'⌕'},
  {href:'/compare',label:'比較',icon:'◇'},
  {href:'/dashboard',label:'マイページ',icon:'○'},
];

export default function AppBottomNav(){
  const pathname=usePathname();
  if(pathname==='/'||pathname.startsWith('/diagnosis'))return null;
  return <nav className="app-bottom-nav" aria-label="メインナビゲーション">
    {items.map(item=>{
      const active=item.href==='/'?pathname==='/':pathname.startsWith(item.href);
      return <a key={item.href} href={item.href} className={active?'active':''}><span aria-hidden="true">{item.icon}</span>{item.label}</a>;
    })}
  </nav>;
}
