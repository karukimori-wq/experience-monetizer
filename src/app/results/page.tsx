'use client';

import { useEffect, useState } from 'react';

const results = [
  {rank:1,name:'Excelテンプレート販売',score:87,readiness:84,reason:'PC・Excel経験を活かしやすく、一人で在宅で進められます。',tag:'今すぐ始めやすい'},
  {rank:2,name:'製造業特化Webライター',score:82,readiness:68,reason:'業界経験を専門性として活用できます。文章力を伸ばすとさらに有力です。',tag:'少し学べば始められる'},
  {rank:3,name:'業務改善テンプレート販売',score:79,readiness:81,reason:'改善経験や資料作成スキルをデジタル商品として活かせます。',tag:'今すぐ始めやすい'},
];

export default function ResultsPage(){
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{ setLoaded(Boolean(localStorage.getItem('experience-monetizer-answers'))); },[]);
 return <main className="results-shell">
  <section className="results-hero"><span className="eyebrow">YOUR MATCHES</span><h1>あなたの経験から、<br/>副業候補が見つかりました。</h1><p>{loaded ? '初回10問の回答をもとにした仮診断です。追加質問に答えると、さらに精度が上がります。' : '診断結果のプレビューを表示しています。'}</p><div className="result-metrics"><div><strong>42</strong><span>候補 / 250件</span></div><div><strong>47%</strong><span>診断信頼度</span></div><div><strong>3</strong><span>TOP候補</span></div></div></section>
  <section className="result-list">{results.map(item=><article className="result-card" key={item.name}><div className="result-rank">0{item.rank}</div><div className="result-main"><span className="status-pill">{item.tag}</span><h2>{item.name}</h2><p>{item.reason}</p><div className="mini-metrics"><span>マッチ度 <strong>{item.score}%</strong></span><span>開始準備度 <strong>{item.readiness}%</strong></span></div></div><button className="detail-button">詳しく見る →</button></article>)}</section>
  <section className="deepen-card"><div><span className="eyebrow">NEXT STEP</span><h2>あなたの「経験資産」をもう少し教えてください。</h2><p>あと数問答えると、現在上位の副業に必要なスキルを優先して確認できます。</p></div><button className="primary-button">診断を深める</button></section>
 </main>
}
