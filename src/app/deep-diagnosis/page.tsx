'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Answers} from '@/data/sideJobs';
import {DeepQuestion,getDeepQuestions} from '@/data/deepQuestions';

export default function DeepDiagnosis(){const router=useRouter();const [questions,setQuestions]=useState<DeepQuestion[]>([]);const [step,setStep]=useState(0);const [skills,setSkills]=useState<Record<string,number>>({});
useEffect(()=>{const raw=localStorage.getItem('experience-monetizer-answers');if(!raw){router.push('/diagnosis');return}const qs=getDeepQuestions(JSON.parse(raw) as Answers);setQuestions(qs);const saved=localStorage.getItem('experience-monetizer-skills');if(saved){try{setSkills(JSON.parse(saved))}catch{}}},[router]);
if(!questions.length)return <main className="diagnosis-shell"><section className="question-panel"><p>質問を準備しています...</p></section></main>;
const q=questions[step];const progress=((step+1)/questions.length)*100;const currentScore=skills[q.options[0]?.skill];
function choose(skill:string,score:number){const next={...skills,[skill]:score};setSkills(next);localStorage.setItem('experience-monetizer-skills',JSON.stringify(next));if(step===questions.length-1)router.push('/results');else setStep(v=>v+1)}
return <main className="diagnosis-shell"><header className="diagnosis-header"><a href="/" className="brand">経験マネタイザー</a><span>深掘り {step+1} / {questions.length}</span></header><div className="progress-track"><div style={{width:`${progress}%`}}/></div><section className="question-panel"><div className="question-meta"><span>DEEP DIAGNOSIS</span><span>{currentScore!==undefined?'回答済み・変更できます':'診断精度アップ'}</span></div><h1>{q.title}</h1><p>{q.subtitle}</p><div className="option-grid">{q.options.map(o=><button key={o.label} className={`option-button ${currentScore===o.score?'selected':''}`} onClick={()=>choose(o.skill,o.score)}>{o.label}<span>{currentScore===o.score?'✓':'→'}</span></button>)}</div><div className="diagnosis-actions"><button className="secondary-button" disabled={step===0} onClick={()=>setStep(v=>v-1)}>戻る</button><a href="/results" className="nav-cta">診断結果を見る</a></div></section></main>}
