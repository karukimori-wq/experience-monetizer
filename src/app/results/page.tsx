'use client';

import {useEffect,useMemo,useState} from 'react';
import {Answers} from '@/data/sideJobs';
import {calculateCatalogMatches,CatalogMatch} from '@/data/catalogMatcher';
import {getCatalogSkills} from '@/data/catalogDetail';

const FAV='experience-monetizer-favorites';

type SkillView={name:string;score:number;level:string;status:string};

function insight(item:CatalogMatch,skills:Record<string,number>){
  const required=getCatalogSkills(item);
  const scored=required.map(s=>({...s,current:skills[s.name]??0}));
  const known=scored.filter(s=>s.current>0).sort((a,b)=>(b.current-b.required)-(a.current-a.required));
  const gaps=scored.filter(s=>s.current<s.required).sort((a,b)=>(b.required-b.current)-(a.required-a.current));
  const strengths=known.slice(0,2).map(s=>s.name);
  if(!strengths.length)strengths.push(...item.matchedKeywords.slice(0,2));
  return{strengths,gaps:gaps.slice(0,2).map(s=>s.name)};
}

function skillLevel(score:number){
  if(score>=90)return 'S';
  if(score>=75)return 'A';
  if(score>=60)return 'B';
  if(score>=40)return 'C';
  return 'D';
}

function skillStatus(score:number){
  if(score>=80)return '強みとして活かせます';
  if(score>=60)return '実践で伸ばせます';
  if(score>=40)return '基礎があります';
  return 'これから育てるスキル';
}

export default function ResultsPage(){
  const [results,setResults]=useState<CatalogMatch[]>([]);
  const [confidence,setConfidence]=useState(0);
  const [skills,setSkills]=useState<Record<string,number>>({});
  const [favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{
    const raw=localStorage.getItem('experience-monetizer-answers');
    if(!raw)return;
    const answers:Answers=JSON.parse(raw);
    const deepRaw=localStorage.getItem('experience-monetizer-skills');
    const deep:Record<string,number>=deepRaw?JSON.parse(deepRaw):{};
    setSkills(deep);
    setFavorites(JSON.parse(localStorage.getItem(FAV)||'[]'));
    const answered=Object.keys(answers).filter(k=>answers[k]?.length).length;
    setConfidence(Math.min(92,25+answered*4+Object.keys(deep).length*7));
    setResults(calculateCatalogMatches(answers,deep));
  },[]);

  const skillList=useMemo<SkillView[]>(()=>Object.entries(skills)
    .map(([name,score])=>({name,score,level:skillLevel(score),status:skillStatus(score)}))
    .sort((a,b)=>b.score-a.score),[skills]);
  const skillIndex=skillList.length?Math.round(skillList.reduce((sum,s)=>sum+s.score,0)/skillList.length):0;
  const strongest=skillList.slice(0,3);

  function toggle(id:string){
    setFavorites(prev=>{
      const next=prev.includes(id)?prev.filter(v=>v!==id):[...prev,id].slice(-4);
      localStorage.setItem(FAV,JSON.stringify(next));
      return next;
    });
  }

  const top=results.slice(0,10);

  return <main className="results-shell">
    <section className="results-hero results-hero-compact">
      <span className="eyebrow">YOUR SKILL PROFILE</span>
      <h1>経験を、使えるスキルに<br/>変換しました。</h1>
      <p>回答から現在のスキルを見える化し、その組み合わせが最も活きる副業を提案します。副業はゴールではなく、スキルを活かして育てるための実践先です。</p>
      <div className="result-overview skill-overview">
        <div className="result-overview-main">
          <span>総合スキル指数</span>
          <strong>{skillIndex||'—'}{skillIndex?'点':''}</strong>
          <small>確認済みスキル {skillList.length}件</small>
        </div>
        <div className="result-overview-sub">
          <span>診断信頼度</span>
          <strong>{confidence||'—'}{confidence?'%':''}</strong>
          <small>行動・実績の登録で精度が上がります</small>
        </div>
      </div>
    </section>

    <section className="dashboard-card skill-profile-card">
      <div className="skill-profile-heading">
        <div>
          <span className="eyebrow">SKILL ASSETS</span>
          <h2>あなたのスキル一覧</h2>
          <p className="muted-copy">点数は現在地です。これからの行動や実績を積み重ねることで更新していきます。</p>
        </div>
        <a href="/deep-diagnosis" className="secondary-button link-button">スキル診断を追加</a>
      </div>
      {skillList.length?<div className="skill-score-list">{skillList.map(skill=><article key={skill.name} className="skill-score-row">
        <div className="skill-grade">{skill.level}</div>
        <div className="skill-score-main">
          <div className="skill-score-label"><strong>{skill.name}</strong><span>{skill.status}</span></div>
          <div className="skill-score-track"><div style={{width:`${skill.score}%`}}/></div>
        </div>
        <strong className="skill-score-number">{skill.score}</strong>
      </article>)}</div>:<div className="skill-empty-state">
        <strong>まだ点数化されたスキルがありません</strong>
        <p>深掘り診断に答えると、経験がスキル点数として追加されます。</p>
        <a href="/deep-diagnosis" className="primary-button link-button">スキルを点数化する</a>
      </div>}
      {strongest.length>0&&<div className="skill-summary-strip">
        <span>現在の強み</span>
        <strong>{strongest.map(s=>s.name).join('・')}</strong>
        <small>この組み合わせを基準に副業を並べています</small>
      </div>}
    </section>

    <section className="results-recommendation-intro">
      <div>
        <span className="eyebrow">BEST OPPORTUNITIES</span>
        <h2>今のスキルに合う副業</h2>
        <p>適合度だけでなく、活かせる強みと、次に伸ばすべきスキルまで確認できます。</p>
      </div>
      <div className="results-guide"><strong>まずはTOP3を確認</strong><span>気になる候補は比較に追加すると、収入・時間・難易度を横並びで確認できます。</span></div>
    </section>

    {top.length?<>
      <section className="result-list">{top.map((item,index)=>{
        const info=insight(item,skills);
        const selected=favorites.includes(item.id);
        return <article className={index<3?'result-card result-card-featured':'result-card'} key={item.id}>
          <div className="result-rank-wrap"><span className="result-rank-label">RANK</span><div className="result-rank">{String(index+1).padStart(2,'0')}</div></div>
          <div className="result-main">
            <div className="result-card-top"><span className="status-pill">{item.category} · {item.revenueModel}</span><span className="result-score-chip">適合 {item.score}%</span></div>
            <h2>{item.name}</h2><p>{item.reason}</p>
            <div className="result-quick-facts"><span><small>準備度</small><strong>{item.readiness}%</strong></span><span><small>週の目安</small><strong>{item.weeklyHours}h〜</strong></span><span><small>初期負担</small><strong aria-label={`${item.startupLoad}段階`}>{'●'.repeat(item.startupLoad)}{'○'.repeat(Math.max(0,5-item.startupLoad))}</strong></span></div>
            <div className="result-insights"><div><small>活かせるスキル</small><strong>{info.strengths.length?info.strengths.join('・'):'診断を深めると表示されます'}</strong></div><div><small>次に伸ばすスキル</small><strong>{info.gaps.length?info.gaps.join('・'):'大きな不足はありません'}</strong></div></div>
          </div>
          <div className="result-actions"><a className="detail-button result-primary-action" href={`/jobs/${item.id}`}>最初の一歩を見る →</a><button className={selected?'favorite-button active':'favorite-button'} onClick={()=>toggle(item.id)}>{selected?'✓ 比較中':'+ 比較に追加'}</button></div>
        </article>})}</section>
      <div className="catalog-summary result-summary-actions"><a href="/jobs" className="nav-cta">250件の副業をすべて見る →</a>{favorites.length>1&&<a href="/compare" className="primary-button link-button result-compare-cta">選んだ{favorites.length}件を比較する</a>}</div>
    </>:<section className="dashboard-card"><h2>診断データがありません</h2><a className="primary-button link-button" href="/diagnosis">診断を始める</a></section>}

    <section className="deepen-card skill-loop-card"><div><span className="eyebrow">SKILL GROWTH LOOP</span><h2>行動すると、スキル評価が育つ</h2><p>副業のステップを進め、制作・投稿・提案・売上などの実績を記録すると、その証拠をもとにスキルを更新していく設計へ発展させます。</p></div><a href="/dashboard" className="primary-button link-button">行動を始める</a></section>
  </main>;
}
