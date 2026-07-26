'use client';

import {useEffect,useMemo,useState} from 'react';

type SkillEntry={name:string;score:number};

function rank(score:number){if(score>=90)return 'S';if(score>=75)return 'A';if(score>=60)return 'B';if(score>=40)return 'C';return 'D'}
function status(score:number){if(score>=80)return '実践で強く活かせる';if(score>=60)return '副業で活かせる';if(score>=40)return '伸ばすと武器になる';return 'これから育てるスキル'}

export default function SkillsPage(){
  const [skills,setSkills]=useState<Record<string,number>>({});
  useEffect(()=>{try{setSkills(JSON.parse(localStorage.getItem('experience-monetizer-skills')||'{}'))}catch{}},[]);
  const entries=useMemo<SkillEntry[]>(()=>Object.entries(skills).map(([name,score])=>({name,score})).sort((a,b)=>b.score-a.score),[skills]);
  const average=entries.length?Math.round(entries.reduce((sum,item)=>sum+item.score,0)/entries.length):0;
  const strengths=entries.filter(item=>item.score>=60).slice(0,3);
  const growth=entries.filter(item=>item.score<60).slice(0,3);

  return <main className="results-shell skill-ledger-shell">
    <header className="catalog-header skill-ledger-header">
      <div><span className="eyebrow">SKILL ASSETS</span><h1>あなたのスキル資産</h1><p>診断・行動・実績から、現在のスキルを見える化します。副業提案は、このスキルデータをもとに更新されます。</p></div>
      <a href="/deep-diagnosis" className="nav-cta">スキル診断を追加 →</a>
    </header>

    <section className="skill-ledger-summary">
      <article className="dashboard-card skill-index-card"><span className="eyebrow">TOTAL INDEX</span><strong>{entries.length?average:'—'}</strong><span>総合スキル指数</span><small>{entries.length}件のスキルを確認済み</small></article>
      <article className="dashboard-card"><span className="eyebrow">STRENGTHS</span><h2>今すぐ活かせる強み</h2><div className="skill-mini-list">{strengths.length?strengths.map(item=><span key={item.name}>{item.name}<strong>{item.score}</strong></span>):<p className="muted-copy">診断を進めると強みが表示されます。</p>}</div></article>
      <article className="dashboard-card"><span className="eyebrow">GROWTH</span><h2>次に育てたいスキル</h2><div className="skill-mini-list">{growth.length?growth.map(item=><span key={item.name}>{item.name}<strong>{item.score}</strong></span>):<p className="muted-copy">大きな弱点はまだ見つかっていません。</p>}</div></article>
    </section>

    <section className="dashboard-card skill-ledger-list">
      <div className="skill-ledger-title"><div><span className="eyebrow">SKILL LIST</span><h2>スキル一覧</h2></div><a href="/results" className="detail-button link-button">合う副業を見る →</a></div>
      {entries.length?<div className="skill-asset-grid">{entries.map(item=><article key={item.name} className="skill-asset-row"><div className={`skill-rank rank-${rank(item.score).toLowerCase()}`}>{rank(item.score)}</div><div className="skill-asset-main"><div><strong>{item.name}</strong><span>{status(item.score)}</span></div><div className="skill-progress-track"><span style={{width:`${item.score}%`}}/></div></div><strong className="skill-score">{item.score}</strong></article>)}</div>:<div className="skill-empty"><h3>まだスキルデータがありません</h3><p>深掘り診断に回答すると、スキルが点数化されてここに蓄積されます。</p><a href="/deep-diagnosis" className="primary-button link-button">スキル診断を始める</a></div>}
    </section>

    <section className="deepen-card skill-loop-card"><div><span className="eyebrow">GROWTH LOOP</span><h2>行動と実績が、次のスキル評価になります</h2><p>副業のステップ完了や活動記録を、将来はスキルの加点根拠として保存します。自己評価だけではなく、何を実行したかで成長を示せる設計です。</p></div><a href="/dashboard" className="primary-button link-button">行動を記録する</a></section>
  </main>
}
