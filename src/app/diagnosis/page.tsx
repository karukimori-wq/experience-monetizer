'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { quickQuestions } from '@/data/questions';

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string[]>>({});
  const question = quickQuestions[step];
  const selected = answers[question.id] ?? [];
  const progress = ((step + 1) / quickQuestions.length) * 100;
  const canContinue = selected.length > 0;

  const selectionLabel = useMemo(() => question.maxSelections ? `選択 ${selected.length}/${question.maxSelections}` : selected.length ? `${selected.length}件選択` : '', [question.maxSelections, selected.length]);

  function toggle(option:string) {
    if (!question.multiple) {
      setAnswers(prev => ({...prev, [question.id]:[option]}));
      return;
    }
    setAnswers(prev => {
      const current = prev[question.id] ?? [];
      if (current.includes(option)) return {...prev, [question.id]:current.filter(v => v !== option)};
      if (question.maxSelections && current.length >= question.maxSelections) return prev;
      return {...prev, [question.id]:[...current, option]};
    });
  }

  function next() {
    if (!canContinue) return;
    if (step === quickQuestions.length - 1) {
      localStorage.setItem('experience-monetizer-answers', JSON.stringify(answers));
      router.push('/results');
      return;
    }
    setStep(value => value + 1);
  }

  return <main className="diagnosis-shell">
    <header className="diagnosis-header">
      <a href="/" className="brand">経験マネタイザー</a>
      <span>{step + 1} / {quickQuestions.length}</span>
    </header>
    <div className="progress-track"><div style={{width:`${progress}%`}} /></div>
    <section className="question-panel">
      <div className="question-meta"><span>QUICK DIAGNOSIS</span><span>{selectionLabel}</span></div>
      <h1>{question.title}</h1>
      {question.subtitle && <p>{question.subtitle}</p>}
      <div className="option-grid">
        {question.options.map(option => <button key={option} className={`option-button ${selected.includes(option) ? 'selected' : ''}`} onClick={() => toggle(option)}>{option}<span>{selected.includes(option) ? '✓' : '+'}</span></button>)}
      </div>
      <div className="diagnosis-actions">
        <button className="secondary-button" disabled={step===0} onClick={() => setStep(v => v-1)}>戻る</button>
        <button className="primary-button" disabled={!canContinue} onClick={next}>{step===quickQuestions.length-1 ? '結果を見る' : '次へ'}</button>
      </div>
    </section>
  </main>;
}
