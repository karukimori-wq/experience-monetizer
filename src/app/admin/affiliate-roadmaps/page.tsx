'use client';

import {useMemo,useState} from 'react';
import {betaCatalog} from '@/data/jobCatalog';
import {getSevenSteps} from '@/data/growthResources';
import {getCatalogSkills} from '@/data/catalogDetail';
import {getLearningResources,learningResources} from '@/data/learningResources';

function revenueResource(job:(typeof betaCatalog)[number]){
  const key=job.revenueModel==='商品販売'?'digital-market':job.revenueModel==='受託'||job.revenueModel==='時間報酬'?'freelance-market':job.revenueModel==='月額継続'?'management-tool':job.revenueModel==='広告・アフィリエイト'?'seo-course':'online-tools';
  return learningResources.find(resource=>resource.affiliateKey===key);
}

function plannedResources(job:(typeof betaCatalog)[number]){
  const skills=getCatalogSkills(job).map(skill=>skill.name);
  const learning=getLearningResources(skills);
  return [
    {step:2,resource:learning[0],purpose:'不足スキルを補う'},
    {step:4,resource:learning[1],purpose:'制作・品質確認を助ける'},
    {step:6,resource:revenueResource(job),purpose:'販売・案件獲得につなげる'}
  ].filter(item=>item.resource);
}

export default function AffiliateRoadmapsPage(){
  const [query,setQuery]=useState('');
  const [model,setModel]=useState('すべて');
  const rows=useMemo(()=>betaCatalog.map(job=>({job,steps:getSevenSteps(job),resources:plannedResources(job)})).filter(row=>{
    const matchQuery=!query||`${row.job.name} ${row.job.category} ${row.job.keywords.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    const matchModel=model==='すべて'||row.job.revenueModel===model;
    return matchQuery&&matchModel&&row.resources.length>0;
  }),[query,model]);
  const models=['すべて',...Array.from(new Set(betaCatalog.map(job=>job.revenueModel)))];
  function exportCsv(){
    const header=['副業名','収益モデル','アフィリエイト対象ステップ','STEP1','STEP2','STEP3','STEP4','STEP5','STEP6','STEP7'];
    const lines=rows.map(({job,steps,resources})=>[
      job.name,job.revenueModel,resources.map(item=>`STEP${item.step}:${item.resource?.title}`).join(' / '),
      ...steps.map(step=>`${step.title}｜${step.description}`)
    ].map(value=>`"${String(value??'').replace(/"/g,'""')}"`).join(','));
    const blob=new Blob(['\ufeff'+[header.join(','),...lines].join('\n')],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='affiliate-roadmap-matrix.csv';a.click();URL.revokeObjectURL(url);
  }
  return <main className="results-shell affiliate-matrix-shell">
    <header className="catalog-header"><div><span className="eyebrow">ADMIN · ROADMAP MONETIZATION</span><h1>副業×7ステップ<br/>収益導線一覧</h1><p>各副業の7ステップを横断し、学習・制作支援・販売先のアフィリエイト候補を確認します。</p></div><a href="/settings" className="nav-cta">← 設定</a></header>
    <section className="dashboard-card affiliate-matrix-controls"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="副業名・カテゴリ・キーワードで検索"/><select value={model} onChange={e=>setModel(e.target.value)}>{models.map(value=><option key={value}>{value}</option>)}</select><button className="secondary-button" onClick={exportCsv}>CSVを書き出す</button></section>
    <section className="affiliate-matrix-summary"><div><span>対象副業</span><strong>{rows.length}</strong></div><div><span>収益導線候補</span><strong>{rows.reduce((sum,row)=>sum+row.resources.length,0)}</strong></div><div><span>主な配置</span><strong>STEP 2・4・6</strong></div></section>
    <section className="affiliate-matrix-wrap"><table className="affiliate-matrix"><thead><tr><th>副業名</th><th>アフィリエイト対象</th>{[1,2,3,4,5,6,7].map(step=><th key={step}>STEP {step}</th>)}</tr></thead><tbody>{rows.map(({job,steps,resources})=><tr key={job.id}><th><a href={`/jobs/${job.id}`}>{job.name}</a><small>{job.category} · {job.revenueModel}</small></th><td><div className="affiliate-target-list">{resources.map(item=><span key={`${job.id}-${item.step}`}><b>STEP {item.step}</b>{item.resource?.title}<small>{item.purpose}</small></span>)}</div></td>{steps.map((step,index)=><td key={`${job.id}-${index}`} className={resources.some(item=>item.step===index+1)?'affiliate-step-cell':''}><b>{step.title}</b><span>{step.description}</span>{resources.find(item=>item.step===index+1)&&<em>収益導線候補</em>}</td>)}</tr>)}</tbody></table></section>
  </main>;
}
