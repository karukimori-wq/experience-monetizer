'use client';
import {useEffect,useState} from 'react';
import {calculateCatalogMatches,CatalogMatch} from '@/data/catalogMatcher';
import {Answers} from '@/data/sideJobs';

const demo=[
 {name:'note運用',score:87,readiness:82,id:'beta-001'},
 {name:'アプリ開発',score:82,readiness:70,id:'beta-007'},
 {name:'住宅相談',score:79,readiness:76,id:'beta-036'}
];

export default function Home(){
 const [matches,setMatches]=useState<(CatalogMatch|typeof demo[number])[]>(demo);
 const [confidence,setConfidence]=useState(47);
 const [hasDiagnosis,setHasDiagnosis]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem('experience-monetizer-answers');if(!raw)return;const answers:Answers=JSON.parse(raw);const skills=JSON.parse(localStorage.getItem('experience-monetizer-skills')||'{}');const ranked=calculateCatalogMatches(answers,skills);if(ranked.length){setMatches(ranked.slice(0,3));setHasDiagnosis(true);const answered=Object.keys(answers).filter(k=>answers[k]?.length).length;setConfidence(Math.min(92,25+answered*4+Object.keys(skills).length*7))}}catch{}},[]);
 return <main className="app-shell playful-home">
  <nav className="top-nav playful-nav">
   <a className="brand playful-brand" href="/">経験マネタイザー</a>
   <div className="top-nav-links playful-nav-links"><a href="/diagnosis">診断</a><a href="/jobs">探す</a></div>
  </nav>

  <section className="playful-hero">
   <span className="beta-badge">β版・毎日更新中 🔥</span>
   <h1>その「普通」、<br/>実は誰かの<span>“欲しい”</span>かも。</h1>
   <p>仕事・趣味・人生経験を選ぶだけで、250種類の副業からピッタリを診断！むずかしいことは考えなくてOK。</p>

   <div className="experience-card-stack" aria-label="副業候補の表示イメージ">
    {matches.slice(0,3).map((match,index)=><article className={`experience-card experience-card-${index+1}`} key={match.id}>
      <small>{index===0?'執筆系':index===1?'開発系':'相談系'}</small>
      <strong>{match.name}</strong>
      <span>{index===0?'✎':index===1?'⌨':'⌂'}</span>
    </article>)}
   </div>

   <div className="playful-actions">
    <a href={hasDiagnosis?'/results':'/diagnosis'} className="playful-cta playful-cta-primary">{hasDiagnosis?'診断結果をもう一度見る！':'無料で診断を始める！'} <b>›</b></a>
    <a href="/jobs" className="playful-cta playful-cta-secondary">250件から探してみる <b>›</b></a>
   </div>
   <p className="playful-note"><span>💡</span>思いついた経験が無くても大丈夫。<br/>「こんなことでも？」が、価値になります。</p>
  </section>

  <section className="dashboard-card playful-match-section"><div className="section-heading"><div><span className="eyebrow">{hasDiagnosis?'YOUR TOP MATCHES':'MATCH PREVIEW'}</span><h2>{hasDiagnosis?'現在のあなたに合う副業 TOP 3':'あなたに合う副業が見えてくる'}</h2></div><div className="confidence">{hasDiagnosis?'診断信頼度':'表示イメージ'} <strong>{confidence}%</strong></div></div><div className="match-list">{matches.map((match,index)=><a href={hasDiagnosis?`/jobs/${match.id}`:'/diagnosis'} className="match-card" key={match.id}><div className="rank">0{index+1}</div><div className="match-copy"><h3>{match.name}</h3><span>{hasDiagnosis?`開始準備度 ${match.readiness}%`:'診断するとあなた専用の順位になります'}</span></div><div className="score"><strong>{match.score}</strong><small>%</small></div></a>)}</div>{hasDiagnosis&&<div className="catalog-summary"><a href="/results" className="nav-cta">ランキングをすべて見る →</a></div>}</section>

  <section className="steps"><div><span>01</span><h3>見つける</h3><p>経験を選んで、自分の可能性を発見。</p></div><div><span>02</span><h3>わかる</h3><p>レーダーチャートで強みと不足を可視化。</p></div><div><span>03</span><h3>伸ばす</h3><p>伸ばすと効果の高いスキルを確認。</p></div><div><span>04</span><h3>始める</h3><p>具体的な7ステップで最初の行動まで案内。</p></div></section>
  <section className="dashboard-card monetization-flow"><span className="eyebrow">FROM EXPERIENCE TO INCOME</span><h2>診断で終わらず、最初の収益化まで進める。</h2><div className="monetization-grid"><article><strong>01</strong><h3>経験を棚卸し</h3><p>仕事・趣味・人生経験から、使える強みを見つけます。</p></article><article><strong>02</strong><h3>副業候補を選ぶ</h3><p>250件から、自分の条件とスキルに合う候補を比較します。</p></article><article><strong>03</strong><h3>不足を埋める</h3><p>必要なスキルやツールだけを確認し、遠回りを減らします。</p></article><article><strong>04</strong><h3>実績を作る</h3><p>7ステップで最初の行動に進み、売上・作業時間・利益を記録します。</p></article></div><div className="hero-actions"><a href={hasDiagnosis?'/dashboard':'/diagnosis'} className="primary-button link-button">{hasDiagnosis?'今の進捗を見る':'自分の可能性を診断する'}</a></div></section>

  <style jsx global>{`
   .playful-home{--play-ink:#291b4b;--play-cream:#fff5dc;--play-yellow:#ffc956;--play-pink:#ff5d76;--play-purple:#44339b;background:var(--play-cream);border-radius:34px;padding-left:clamp(22px,6vw,64px);padding-right:clamp(22px,6vw,64px);color:var(--play-ink)}
   .playful-home .playful-nav{padding-top:28px}.playful-brand{font-size:clamp(21px,4vw,30px);color:var(--play-ink)}
   .playful-nav-links{gap:10px}.playful-nav-links a{background:rgba(255,255,255,.78);color:var(--play-ink);padding:11px 17px;border-radius:999px;font-size:14px}
   .playful-hero{max-width:840px;padding:80px 0 72px}.beta-badge{display:inline-block;background:var(--play-yellow);padding:10px 18px;border-radius:999px;font-weight:900;transform:rotate(-1deg);box-shadow:0 4px 0 rgba(84,54,101,.08)}
   .playful-hero h1{font-size:clamp(44px,8vw,78px);line-height:1.12;letter-spacing:-.055em;margin:32px 0 24px;max-width:820px}.playful-hero h1 span{color:var(--play-pink)}
   .playful-hero>p{font-size:clamp(18px,3vw,26px);line-height:1.75;color:#5b4c72;max-width:760px}
   .experience-card-stack{display:grid;grid-template-columns:1fr 1.15fr 1fr;align-items:center;margin:60px 0 48px;max-width:820px}.experience-card{min-height:220px;background:#fff;border:4px solid var(--play-ink);border-radius:28px;display:grid;place-items:center;text-align:center;padding:24px;box-shadow:10px 13px 0 var(--play-ink);position:relative}.experience-card small{font-weight:900;color:#4b3590}.experience-card strong{font-size:clamp(19px,3vw,30px)}.experience-card span{font-size:46px}.experience-card-1{transform:rotate(-4deg) translateX(14px);z-index:1}.experience-card-2{background:var(--play-yellow);transform:translateY(-8px);z-index:3}.experience-card-3{transform:rotate(4deg) translateX(-14px);z-index:1}
   .playful-actions{display:grid;gap:16px;max-width:760px}.playful-cta{display:flex;justify-content:center;align-items:center;gap:14px;padding:23px 28px;border-radius:26px;color:#fff;font-weight:900;font-size:clamp(18px,3vw,27px);text-align:center}.playful-cta b{margin-left:auto;font-size:34px}.playful-cta-primary{background:var(--play-pink);box-shadow:0 10px 0 #c83751}.playful-cta-secondary{background:var(--play-purple);box-shadow:0 10px 0 #29216b}.playful-cta:active{transform:translateY(5px);box-shadow:0 5px 0 rgba(0,0,0,.25)}
   .playful-note{font-size:18px!important;margin-top:34px!important;display:flex;gap:12px;align-items:flex-start}.playful-note span{font-size:30px}
   .playful-match-section{margin-top:20px;background:rgba(255,255,255,.72)}
   @media(max-width:720px){.playful-home{width:100%;border-radius:0;padding-left:22px;padding-right:22px}.playful-home .top-nav{align-items:flex-start}.playful-nav-links{flex-wrap:nowrap}.playful-hero{padding-top:62px}.experience-card-stack{margin-top:46px;grid-template-columns:1fr 1.12fr 1fr}.experience-card{min-height:170px;padding:14px 8px;border-width:3px;box-shadow:6px 9px 0 var(--play-ink)}.experience-card strong{font-size:18px;line-height:1.25}.experience-card span{font-size:34px}.experience-card-1{transform:rotate(-4deg) translateX(9px)}.experience-card-3{transform:rotate(4deg) translateX(-9px)}.playful-cta{border-radius:22px;padding:20px 22px}.playful-home .steps{grid-template-columns:1fr 1fr}.playful-note{font-size:15px!important}}
   @media(max-width:430px){.playful-hero h1{font-size:46px}.playful-hero>p{font-size:18px}.experience-card{min-height:150px}.experience-card small{font-size:11px}.experience-card strong{font-size:16px}.experience-card span{font-size:28px}.playful-nav-links a{padding:9px 13px}.playful-brand{font-size:20px}}
  `}</style>
 </main>
}