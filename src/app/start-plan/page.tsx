'use client';

import {useEffect,useMemo,useState} from 'react';
import {betaCatalog} from '@/data/jobCatalog';
import {getSevenSteps} from '@/data/growthResources';
import {enrichRoadmap} from '@/data/roadmapExperience';
import {trackAffiliateClick} from '@/data/affiliateTracking';

const JOB='experience-monetizer-active-job';
const progressKey=(id:string)=>`experience-monetizer-start-progress:${id}`;
const qualityKey=(id:string)=>`experience-monetizer-roadmap-quality:${id}`;
type QualityState=Record<string,boolean[]>;

export default function StartPlanPage(){
 const [jobId,setJobId]=useState('');
 const [done,setDone]=useState<number[]>([]);
 const [quality,setQuality]=useState<QualityState>({});

 useEffect(()=>{
  const id=localStorage.getItem(JOB)||'';
  setJobId(id);
  if(!id)return;
  const scoped=localStorage.getItem(progressKey(id));
  const legacy=localStorage.getItem('experience-monetizer-start-progress');
  setDone(JSON.parse(scoped??legacy??'[]'));
  setQuality(JSON.parse(localStorage.getItem(qualityKey(id))||'{}'));
  if(!scoped&&legacy)localStorage.setItem(progressKey(id),legacy);
 },[]);

 const job=useMemo(()=>betaCatalog.find(item=>item.id===jobId),[jobId]);
 const steps=useMemo(()=>job?enrichRoadmap(job,getSevenSteps(job)):[],[job]);
 const completed=done.filter(index=>index<steps.length).length;
 const percent=steps.length?Math.round(completed/steps.length*100):0;
 const nextIndex=steps.findIndex((_,index)=>!done.includes(index));
 const nextStep=nextIndex>=0?steps[nextIndex]:null;

 function toggleQuality(stepIndex:number,checkIndex:number){
  const key=String(stepIndex);
  const current=quality[key]??steps[stepIndex]?.qualityChecks.map(()=>false)??[];
  const next={...quality,[key]:current.map((value,index)=>index===checkIndex?!value:value)};
  setQuality(next);
  if(jobId)localStorage.setItem(qualityKey(jobId),JSON.stringify(next));
 }
 function passed(stepIndex:number){
  const checks=steps[stepIndex]?.qualityChecks??[];
  const state=quality[String(stepIndex)]??[];
  return checks.length>0&&checks.every((_,index)=>state[index]);
 }
 function toggle(stepIndex:number){
  const isDone=done.includes(stepIndex);
  if(!isDone&&!passed(stepIndex))return;
  setDone(previous=>{
   const next=isDone?previous.filter(value=>value!==stepIndex):[...previous,stepIndex];
   if(jobId)localStorage.setItem(progressKey(jobId),JSON.stringify(next));
   return next;
  });
 }

 if(!job)return <main className="results-shell"><section className="catalog-header"><div><span className="eyebrow">FIRST ACTION GUIDE</span><h1>始める副業を決めましょう。</h1><p>副業を選ぶと、今日できる最初の一歩から具体的に案内します。</p></div><a href="/jobs" className="primary-button link-button">副業を探す</a></section></main>;

 return <main className="results-shell">
  <header className="catalog-header start-plan-header">
   <div><span className="eyebrow">FIRST ACTION GUIDE</span><h1>{job.name}</h1><p>この副業を始めるために、次に何をすればよいかを順番に案内します。各アクションには、具体的な手順・完成するもの・完了条件があります。</p></div>
   <a href={`/jobs/${job.id}`} className="nav-cta">副業詳細を見る →</a>
  </header>

  <section className="dashboard-card roadmap-principles">
   <div><strong>① 今やること</strong><span>迷わず手を動かせる具体的な行動を示す</span></div>
   <div><strong>② 完成するもの</strong><span>各アクションで何が残るかを明確にする</span></div>
   <div><strong>③ 次へ進む条件</strong><span>完了条件を確認して次の行動へ進む</span></div>
  </section>

  <section className="dashboard-card plan-progress"><div><div><span className="eyebrow">PROGRESS</span><p>{completed} / {steps.length} アクション完了</p></div><strong>{percent}%</strong></div><div className="progress-track"><div style={{width:`${percent}%`}}/></div></section>

  {nextStep&&<section className="dashboard-card plan-next-action">
   <div>
    <span className="eyebrow">今やること · ACTION {nextIndex+1}</span>
    <h2>{nextStep.title}</h2>
    <p>{nextStep.description}</p>
    {nextStep.estimatedTime&&<p><strong>目安時間：</strong>{nextStep.estimatedTime}</p>}
    {nextStep.purpose&&<div className="roadmap-outcome"><small>なぜ必要？</small><strong>{nextStep.purpose}</strong></div>}
    {nextStep.actions?.length&&<div className="quality-gate"><div><span className="eyebrow">HOW TO</span><strong>この順番で進める</strong></div>{nextStep.actions.map((action,index)=><div key={action}><span>{index+1}. {action}</span></div>)}</div>}
    <div className="roadmap-outcome"><small>このアクションで完成するもの</small><strong>{nextStep.outcome}</strong></div>
    {nextStep.url&&<a className="roadmap-link" href={nextStep.url} target="_blank" rel="noopener noreferrer"><span>{nextStep.linkLabel||'公式サイトを開く'}</span><small>今の作業に必要なページを開く</small></a>}
   </div>
   <div className="next-quality-status"><span>{passed(nextIndex)?'完了条件を満たしました':'完了条件を確認してください'}</span><button className="primary-button" disabled={!passed(nextIndex)} onClick={()=>toggle(nextIndex)}>完了して次へ ✓</button></div>
  </section>}

  <section className="plan-list">
   {steps.map((step,index)=>{
    const isDone=done.includes(index); const isNext=index===nextIndex;
    const checks=quality[String(index)]??step.qualityChecks.map(()=>false);
    return <article className={`${isDone?'plan-step done':'plan-step'}${isNext?' current':''}`} key={`${job.id}-${index}-${step.title}`}>
     <button className="plan-check" onClick={()=>toggle(index)} aria-label={`ACTION ${index+1}を${isDone?'未完了に戻す':'完了にする'}`}>{isDone?'✓':index+1}</button>
     <div className="roadmap-step-content">
      <span className="eyebrow">{isNext?'NEXT · ':''}ACTION {index+1} · {step.stage}</span>
      <h2>{step.title}</h2><p>{step.description}</p>
      {step.estimatedTime&&<p><strong>目安時間：</strong>{step.estimatedTime}</p>}
      {step.purpose&&<div className="roadmap-outcome"><small>目的</small><strong>{step.purpose}</strong></div>}
      {step.actions?.length&&<div className="quality-gate"><div><span className="eyebrow">HOW TO</span><strong>具体的な進め方</strong></div>{step.actions.map((action,actionIndex)=><div key={action}><span>{actionIndex+1}. {action}</span></div>)}</div>}
      <div className="roadmap-outcome"><small>完成するもの</small><strong>{step.outcome}</strong></div>
      {step.url&&<a className="roadmap-link" href={step.url} target="_blank" rel="noopener noreferrer"><span>{step.linkLabel||'公式サイトを開く'}</span><small>このアクションに必要なページを開く</small></a>}
      <div className="quality-gate"><div><span className="eyebrow">DONE CHECK</span><strong>{passed(index)?'完了条件を満たしました':`${step.qualityChecks.length}項目を確認`}</strong></div>{step.qualityChecks.map((check,checkIndex)=><label key={check} className={checks[checkIndex]?'checked':''}><input type="checkbox" checked={Boolean(checks[checkIndex])} onChange={()=>toggleQuality(index,checkIndex)}/><span>{check}</span></label>)}</div>
      {step.resource&&<aside className="roadmap-resource"><div><span className="eyebrow">OPTIONAL SUPPORT · {step.resource.kind}</span><strong>{step.resource.title}</strong><p>{step.resource.description}</p><small>必要な場合だけ利用する補助サービスです。</small></div><a href={step.resource.url} target="_blank" rel="sponsored noopener noreferrer" onClick={()=>trackAffiliateClick(step.resource!.affiliateKey,job.id)}>{step.resource.cta} →</a></aside>}
      {!isDone&&<button className="plan-inline-complete" disabled={!passed(index)} onClick={()=>toggle(index)}>{passed(index)?'完了して次へ進む':'完了条件を確認してください'}</button>}
     </div>
    </article>;
   })}
  </section>

  {percent===100&&<section className="deepen-card"><div><span className="eyebrow">FIRST ACTIONS COMPLETED</span><h2>最初の実行ルートを完了しました。</h2><p>ここまでに作った成果物や公開・応募の結果を記録すると、次の改善行動につなげられます。</p></div><a href="/activity" className="primary-button link-button">行動・実績を記録する</a></section>}
 </main>;
}
