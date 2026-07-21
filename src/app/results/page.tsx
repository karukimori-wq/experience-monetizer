'use client';

import { useEffect, useState } from 'react';
import { Answers, calculateMatches } from '@/data/sideJobs';

type Match = ReturnType<typeof calculateMatches>[number];

export default function ResultsPage(){
 const [results,setResults]=useState<Match[]>([]);
 const [confidence,setConfidence]=useState(0);
 useEffect(()=>{
  const raw=localStorage.getItem('experience-monetizer-answers');
  if(!raw) return;
  const answers:Answers=JSON.parse(raw);
  const answered=Object.keys(answers).filter(key=>answers[key]?.length).length;
  setConfidence(Math.min(65,25+answered*4));
  setResults(calculateMatches(answers));
 },[]);
 const top=results.slice(0,5);
 return <main className="results-shell">
  <section className="results-hero"><span className="eyebrow">YOUR MATCHES</span><h1>あなたの経験から、<br/>副業候補が見つかりました。</h1><p>初回10問の回答を実際にスコアリングした仮診断です。追加質問に答えると、経験レベルやスキルまで反映できます。</p><div className="result-metrics"><div><strong>{results.length || '—'}</strong><span>初期候補</span></div><div><strong>{confidence || '—'}{confidence ? '%' : ''}</strong><span>診断信頼度</span></div><div><strong>{top.length || '—'}</strong><span>表示候補</span></div></div></section>
  {top.length ? <section className="result-list">{top.map((item,index)=><article className="result-card" key={item.id}><div className="result-rank">0{index+1}</div><div className="result-main"><span className="status-pill">{item.tags[0]}</span><h2>{item.name}</h2><p>{item.reason}</p><div className="mini-metrics"><span>マッチ度 <strong>{item.score}%</strong></span><span>開始準備度 <strong>{item.readiness}%</strong></span></div></div><button className="detail-button">詳しく見る →</button></article>)}</section> : <section className="dashboard-card"><h2>診断データがありません</h2><p>初回診断から回答してください。</p><a className="primary-button link-button" href="/diagnosis">診断を始める</a></section>}
  <section className="deepen-card"><div><span className="eyebrow">NEXT STEP</span><h2>あなたの「経験資産」をもう少し教えてください。</h2><p>次は上位候補に関係する経験・スキルを深掘りし、マッチ度と診断信頼度を更新します。</p></div><button className="primary-button">診断を深める</button></section>
 </main>
}
