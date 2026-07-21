const matches = [
  { name: 'Excelテンプレート販売', score: 87, status: '今すぐ始めやすい' },
  { name: '製造業特化Webライター', score: 82, status: '少し学べば始められる' },
  { name: '業務改善テンプレート販売', score: 79, status: '今すぐ始めやすい' },
];

export default function Home() {
  return <main className="app-shell">
    <nav className="top-nav"><a className="brand" href="/">経験マネタイザー</a><a href="/diagnosis" className="nav-cta">無料診断</a></nav>
    <section className="hero"><span className="eyebrow">経験マネタイザー β</span><h1>あなたの普通の経験を、<br />副業の可能性に変える。</h1><p>仕事、趣味、人生経験を選ぶだけ。250種類の副業から、あなたの経験が活きる選択肢を見つけます。</p><a href="/diagnosis" className="primary-button link-button">無料で診断を始める</a><div className="hero-meta"><span>AI不使用</span><span>約3分</span><span>完全選択式</span></div></section>
    <section className="dashboard-card"><div className="section-heading"><div><span className="eyebrow">MATCH PREVIEW</span><h2>あなたに合う副業が見えてくる</h2></div><div className="confidence">診断信頼度 <strong>47%</strong></div></div><div className="match-list">{matches.map((match,index)=><article className="match-card" key={match.name}><div className="rank">0{index+1}</div><div className="match-copy"><h3>{match.name}</h3><span>{match.status}</span></div><div className="score"><strong>{match.score}</strong><small>%</small></div></article>)}</div></section>
    <section className="steps"><div><span>01</span><h3>見つける</h3><p>経験を選んで、自分の可能性を発見。</p></div><div><span>02</span><h3>わかる</h3><p>レーダーチャートで強みと不足を可視化。</p></div><div><span>03</span><h3>伸ばす</h3><p>伸ばすと効果の高いスキルを確認。</p></div><div><span>04</span><h3>始める</h3><p>7ステップで最初の行動まで案内。</p></div></section>
  </main>;
}
