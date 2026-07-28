'use client';

import {useEffect,useMemo,useState} from 'react';
import {betaCatalog} from '@/data/jobCatalog';
import {getSevenSteps} from '@/data/growthResources';
import {enrichRoadmap} from '@/data/roadmapExperience';
import {trackAffiliateClick} from '@/data/affiliateTracking';

const JOB='experience-monetizer-active-job';
const progressKey=(id:string)=>`experience-monetizer-start-progress:${id}`;
const qualityKey=(id:string)=>`experience-monetizer-roadmap-quality:${id}`;
const outputKey=(id:string)=>`experience-monetizer-roadmap-outputs:${id}`;
type QualityState=Record<string,boolean[]>;
type OutputState=Record<string,string>;

export default function StartPlanPage(){
 const [jobId,setJobId]=useState('');
 const [done,setDone]=useState<number[]>([]);
 const [quality,setQuality]=useState<QualityState>({});
 const [outputs,setOutputs]=useState<OutputState>({});
 const [showAll,setShowAll]=useState(false);
 const [copiedStep,setCopiedStep]=useState<number|null>(null);

 useEffect(()=>{
  const id=localStorage.getItem(JOB)||'';
  setJobId(id);
  if(!id)return;
  const scoped=localStorage.getItem(progressKey(id));
  const legacy=localStorage.getItem('experience-monetizer-start-progress');
  setDone(JSON.parse(scoped??legacy??'[]'));
  setQuality(JSON.parse(localStorage.getItem(qualityKey(id))||'{}'));
  setOutputs(JSON.parse(localStorage.getItem(outputKey(id))||'{}'));
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
 function saveOutput(stepIndex:number,value:string){
  const next={...outputs,[String(stepIndex)]:value};
  setOutputs(next);
  if(jobId)localStorage.setItem(outputKey(jobId),JSON.stringify(next));
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
 async function copyHelpPrompt(stepIndex:number){
  const step=steps[stepIndex];
  if(!step||!job)return;
  const memo=outputs[String(stepIndex)]?.trim();
  const prompt=[
   `私は「${job.name}」という副業を始めようとしています。`,
   `現在のアクションは「${step.title}」です。`,
   `目的：${step.purpose||step.description}`,
   `完成させるもの：${step.outcome}`,
   step.actions?.length?`進め方：\n${step.actions.map((action,index)=>`${index+1}. ${action}`).join('\n')}`:'',
   memo?`現在のメモ：\n${memo}`:'',
   '初心者にも分かるように、今この場で行う作業を小さく分けて説明してください。質問が必要な場合も、一度に1つだけ聞いてください。'
  ].filter(Boolean).join('\n\n');
  try{
   await navigator.clipboard.writeText(prompt);
   setCopiedStep(stepIndex);
   window.setTimeout(()=>setCopiedStep(current=>current===stepIndex?null:current),2000);
  }catch{
   window.prompt('この文章をコピーしてAIに貼り付けてください。',prompt);
  }
 }

 if(!job)return <main className="results-shell"><section className="catalog-header"><div><span className="eyebrow">FIRST ACTION GUIDE</span><h1>始める副業を決めましょう。</h1><p>副業を選ぶと、今日できる最初の一歩から具体的に案内します。</p></div><a href="/jobs" className="primary-button link-button">副業を探す</a></section></main>;

 const OutputInput=({index,label='作業メモ・成果物URL'}:{index:number;label?:string})=><div className="roadmap-output-input"><label htmlFor={`output-${index}`}><span className="eyebrow">SAVE YOUR OUTPUT</span><strong>{label}</strong></label><textarea id={`output-${index}`} value={outputs[String(index)]||''} onChange={event=>saveOutput(index,event.target.value)} placeholder="例：登録したページのURL、決めたタイトル、作成した文章、次に確認したいこと" rows={3}/><small>入力内容はこの端末に自動保存されます。</small></div>;
 const AiHelp=({index}:{index:number})=><aside className="roadmap-resource"><div><span className="eyebrow">AI HELP · 無料で使えるプロンプト</span><strong>ここで詰まったら、AIに具体的に聞く</strong><p>副業名、今のアクション、完成条件、入力したメモを含む質問文を自動で作ります。</p><small>API接続は不要です。コピーして、普段使っているAIへ貼り付けてください。</small></div><button type="button" className="plan-inline-complete" onClick={()=>copyHelpPrompt(index)}>{copiedStep===index?'コピーしました ✓':'AI相談文をコピー'}</button></aside>;

 return <main className="results-shell">
  <header className="catalog-header start-plan-header">
   <div><span className="eyebrow">FIRST ACTION GUIDE</span><h1>{job.name}</h1><p>先のことを一度に考えず、まずは今表示されている1つだけ進めましょう。</p></div>
   <a href={`/jobs/${job.id}`} className="nav-cta">副業詳細を見る →</a>
  </header>

  <section className="dashboard-card roadmap-principles">
   <div><strong>① 1つだけやる</strong><span>今のアクション以外は考えなくて大丈夫</span></div>
   <div><strong>② できたものを残す</strong><span>URL・文章・決めた内容をその場で記録</span></div>
   <div><strong>③ 困ったらAIに聞く</strong><span>今の状況に合った相談文をすぐコピー</span></div>
  </section>

  <section className="dashboard-card plan-progress"><div><div><span className="eyebrow">PROGRESS</span><p>{completed} / {steps.length} アクション完了</p></div><strong>{percent}%</strong></div><div className="progress-track"><div style={{width:`${percent}%`}}/></div></section>

  {nextStep&&<section className="dashboard-card plan-next-action">
   <div>
    <span className="eyebrow">今日の一歩 · ACTION {nextIndex+1}</span>
    <h2>{nextStep.title}</h2>
    <p>{nextStep.description}</p>
    {nextStep.estimatedTime&&<p><strong>目安時間：</strong>{nextStep.estimatedTime}</p>}
    {nextStep.purpose&&<div className="roadmap-outcome"><small>なぜ必要？</small><strong>{nextStep.purpose}</strong></div>}
    {nextStep.actions?.length&&<div className="quality-gate"><div><span className="eyebrow">HOW TO</span><strong>この順番で進める</strong></div>{nextStep.actions.map((action,index)=><div key={action}><span>{index+1}. {action}</span></div>)}</div>}
    <div className="roadmap-outcome"><small>このアクションで完成するもの</small><strong>{nextStep.outcome}</strong></div>
    {nextStep.url&&<a className="roadmap-link" href={nextStep.url} target="_blank" rel="noopener noreferrer"><span>{nextStep.linkLabel||'公式サイトを開く'}</span><small>今の作業に必要なページを開く</small></a>}
    <OutputInput index={nextIndex}/>
    <AiHelp index={nextIndex}/>
    <div className="quality-gate"><div><span className="eyebrow">DONE CHECK</span><strong>{passed(nextIndex)?'完了条件を満たしました':`${nextStep.qualityChecks.length}項目を確認`}</strong></div>{nextStep.qualityChecks.map((check,checkIndex)=>{const checks=quality[String(nextIndex)]??nextStep.qualityChecks.map(()=>false);return <label key={check} className={checks[checkIndex]?'checked':''}><input type="checkbox" checked={Boolean(checks[checkIndex])} onChange={()=>toggleQuality(nextIndex,checkIndex)}/><span>{check}</span></label>})}</div>
   </div>
   <div className="next-quality-status"><span>{passed(nextIndex)?'完了条件を満たしました':'終わった項目にチェックしてください'}</span><button className="primary-button" disabled={!passed(nextIndex)} onClick={()=>toggle(nextIndex)}>完了して次の一歩へ ✓</button></div>
  </section>}

  <section className="dashboard-card"><button type="button" className="plan-inline-complete" onClick={()=>setShowAll(value=>!value)}>{showAll?'全体の流れを閉じる':'この先の流れも確認する'}</button></section>

  {showAll&&<section className="plan-list">
   {steps.map((step,index)=>{
    const isDone=done.includes(index); const isNext=index===nextIndex;
    const checks=quality[String(index)]??step.qualityChecks.map(()=>false);
    return <article className={`${isDone?'plan-step done':'plan-step'}${isNext?' current':''}`} key={`${job.id}-${index}-${step.title}`}>
     <button className="plan-check" onClick={()=>toggle(index)} aria-label={`ACTION ${index+1}を${isDone?'未完了に戻す':'完了にする'}`}>{isDone?'✓':index+1}</button>
     <div className="roadmap-step-content">
      <span className="eyebrow">{isNext?'NOW · ':''}ACTION {index+1} · {step.stage}</span>
      <h2>{step.title}</h2><p>{step.description}</p>
      {step.estimatedTime&&<p><strong>目安時間：</strong>{step.estimatedTime}</p>}
      {step.purpose&&<div className="roadmap-outcome"><small>目的</small><strong>{step.purpose}</strong></div>}
      {step.actions?.length&&<div className="quality-gate"><div><span className="eyebrow">HOW TO</span><strong>具体的な進め方</strong></div>{step.actions.map((action,actionIndex)=><div key={action}><span>{actionIndex+1}. {action}</span></div>)}</div>}
      <div className="roadmap-outcome"><small>完成するもの</small><strong>{step.outcome}</strong></div>
      {step.url&&<a className="roadmap-link" href={step.url} target="_blank" rel="noopener noreferrer"><span>{step.linkLabel||'公式サイトを開く'}</span><small>このアクションに必要なページを開く</small></a>}
      <OutputInput index={index}/>
      <AiHelp index={index}/>
      <div className="quality-gate"><div><span className="eyebrow">DONE CHECK</span><strong>{passed(index)?'完了条件を満たしました':`${step.qualityChecks.length}項目を確認`}</strong></div>{step.qualityChecks.map((check,checkIndex)=><label key={check} className={checks[checkIndex]?'checked':''}><input type="checkbox" checked={Boolean(checks[checkIndex])} onChange={()=>toggleQuality(index,checkIndex)}/><span>{check}</span></label>)}</div>
      {step.resource&&<aside className="roadmap-resource"><div><span className="eyebrow">OPTIONAL SUPPORT · {step.resource.kind}</span><strong>{step.resource.title}</strong><p>{step.resource.description}</p><small>必要な場合だけ利用する補助サービスです。</small></div><a href={step.resource.url} target="_blank" rel="sponsored noopener noreferrer" onClick={()=>trackAffiliateClick(step.resource!.affiliateKey,job.id)}>{step.resource.cta} →</a></aside>}
     </div>
    </article>;
   })}
  </section>}

  {percent===100&&<section className="deepen-card"><div><span className="eyebrow">FIRST ACTIONS COMPLETED</span><h2>最初の実行ルートを完了しました。</h2><p>ここまでに作った成果物や公開・応募の結果を記録すると、次の改善行動につなげられます。</p></div><a href="/activity" className="primary-button link-button">行動・実績を記録する</a></section>}
 </main>;
}