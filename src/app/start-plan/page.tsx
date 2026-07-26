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

  function saveQuality(next:QualityState){
    setQuality(next);
    if(jobId)localStorage.setItem(qualityKey(jobId),JSON.stringify(next));
  }

  function toggleQuality(stepIndex:number,checkIndex:number){
    const key=String(stepIndex);
    const current=quality[key]??steps[stepIndex]?.qualityChecks.map(()=>false)??[];
    const nextChecks=current.map((value,index)=>index===checkIndex?!value:value);
    saveQuality({...quality,[key]:nextChecks});
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

  const completed=done.filter(index=>index<steps.length).length;
  const percent=steps.length?Math.round(completed/steps.length*100):0;
  const nextIndex=steps.findIndex((_,index)=>!done.includes(index));
  const nextStep=nextIndex>=0?steps[nextIndex]:null;

  if(!job)return <main className="results-shell"><section className="catalog-header"><div><span className="eyebrow">START PLAN</span><h1>始める副業を決めましょう。</h1><p>副業の詳細ページから「この副業を始める」を選ぶと、ここに実行プランが作成されます。</p></div><a href="/jobs" className="primary-button link-button">副業を探す</a></section></main>;

  return <main className="results-shell">
    <header className="catalog-header start-plan-header">
      <div>
        <span className="eyebrow">7-STEP MONETIZE PLAN</span>
        <h1>{job.name}</h1>
        <p>作って終わりではなく、7ステップ目で必ず市場へ出します。各ステップは品質チェックを通過してから完了でき、必要な場面だけ学習・制作・販売サービスを案内します。</p>
      </div>
      <a href={`/jobs/${job.id}`} className="nav-cta">副業詳細を見る →</a>
    </header>

    <section className="dashboard-card roadmap-principles">
      <div><strong>① 行動する</strong><span>読むだけで終わらず、各ステップに成果物を残す</span></div>
      <div><strong>② 品質を通す</strong><span>3つの確認項目を満たしてから次へ進む</span></div>
      <div><strong>③ 市場へ出す</strong><span>最後は公開・応募・提案のどれかを必ず1件行う</span></div>
    </section>

    <section className="dashboard-card plan-progress">
      <div><div><span className="eyebrow">PROGRESS</span><p>{completed} / {steps.length} ステップ完了</p></div><strong>{percent}%</strong></div>
      <div className="progress-track"><div style={{width:`${percent}%`}}/></div>
    </section>

    {nextStep&&<section className="dashboard-card plan-next-action">
      <div>
        <span className="eyebrow">NEXT ACTION · STEP {nextIndex+1} · {nextStep.stage}</span>
        <h2>{nextStep.title}</h2>
        <p>{nextStep.description}</p>
        <div className="roadmap-outcome"><small>このステップの完成条件</small><strong>{nextStep.outcome}</strong></div>
        {nextStep.url&&<a className="roadmap-link" href={nextStep.url} target="_blank" rel="noopener noreferrer"><span>{nextStep.linkLabel||'外部サイトを開く'}</span><small>このステップに必要な公式サイトを新しいタブで開く</small></a>}
      </div>
      <div className="next-quality-status"><span>{passed(nextIndex)?'品質チェック完了':'品質チェックを完了してください'}</span><button className="primary-button" disabled={!passed(nextIndex)} onClick={()=>toggle(nextIndex)}>このステップを完了 ✓</button></div>
    </section>}

    <section className="plan-list">
      {steps.map((step,index)=>{
        const isDone=done.includes(index);
        const isNext=index===nextIndex;
        const checks=quality[String(index)]??step.qualityChecks.map(()=>false);
        return <article className={`${isDone?'plan-step done':'plan-step'}${isNext?' current':''}`} key={`${job.id}-${index}-${step.title}`}>
          <button className="plan-check" onClick={()=>toggle(index)} aria-label={`STEP ${index+1}を${isDone?'未完了に戻す':'完了にする'}`}>{isDone?'✓':index+1}</button>
          <div className="roadmap-step-content">
            <span className="eyebrow">{isNext?'NEXT · ':''}STEP {index+1} · {step.stage}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
            <div className="roadmap-outcome"><small>成果物・完成状態</small><strong>{step.outcome}</strong></div>
            <div className="roadmap-skill-gains"><small>育つスキル</small>{step.skillGains.map(skill=><span key={skill}>{skill}</span>)}</div>
            {step.url&&<a className="roadmap-link" href={step.url} target="_blank" rel="noopener noreferrer"><span>{step.linkLabel||'外部サイトを開く'}</span><small>公式サイトを新しいタブで開く</small></a>}

            <div className="quality-gate">
              <div><span className="eyebrow">QUALITY GATE</span><strong>{passed(index)?'確認完了':'3項目を確認'}</strong></div>
              {step.qualityChecks.map((check,checkIndex)=><label key={check} className={checks[checkIndex]?'checked':''}><input type="checkbox" checked={Boolean(checks[checkIndex])} onChange={()=>toggleQuality(index,checkIndex)}/><span>{check}</span></label>)}
            </div>

            {step.resource&&<aside className="roadmap-resource">
              <div><span className="eyebrow">OPTIONAL SUPPORT · {step.resource.kind}</span><strong>{step.resource.title}</strong><p>{step.resource.description}</p><small>この案内は任意です。利用しなくてもステップは進められます。</small></div>
              <a href={step.resource.url} target="_blank" rel="sponsored noopener noreferrer" onClick={()=>trackAffiliateClick(step.resource!.affiliateKey,job.id)}>{step.resource.cta} →</a>
            </aside>}

            {!isDone&&<button className="plan-inline-complete" disabled={!passed(index)} onClick={()=>toggle(index)}>{passed(index)?'品質確認済み・完了にする':'品質チェック後に完了できます'}</button>}
          </div>
        </article>;
      })}
    </section>

    {percent===100&&<section className="deepen-card"><div><span className="eyebrow">FIRST MONETIZE ACTION DONE</span><h2>市場へ出すところまで完了しました。</h2><p>公開・応募・提案はゴールではなく検証開始です。作業時間、反応、売上、改善点を記録すると、実績がスキル評価へ反映されます。</p></div><a href="/activity" className="primary-button link-button">行動・実績を記録する</a></section>}
  </main>;
}
