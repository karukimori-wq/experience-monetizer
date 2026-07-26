import type {JobCatalogItem} from './jobCatalog';
import type {RoadmapStep} from './growthResources';
import {getCatalogSkills} from './catalogDetail';
import {getAffiliateUrl,getLearningResources,learningResources,type LearningResource} from './learningResources';

export type EnrichedRoadmapStep=RoadmapStep&{
  stage:string;
  outcome:string;
  qualityChecks:string[];
  skillGains:string[];
  resource?:LearningResource&{url:string};
};

const stages=['価値を決める','設計する','形にする','品質を確かめる','売れる状態にする','販売・提案を整える','市場へ出す'];

function outcomeFor(step:RoadmapStep,index:number){
  const defaults=[
    '対象者と提供価値を1文で説明できる',
    '作るもの・進め方が具体的に決まっている',
    '人に見せられる最小成果物が完成している',
    '利用者・依頼者の目線で品質を確認できている',
    '価格・条件・見せ方が決まっている',
    '公開・応募・提案をすぐ実行できる',
    '実際の市場から最初の反応を得る'
  ];
  return defaults[index]??step.title;
}

function checksFor(step:RoadmapStep,index:number,job:JobCatalogItem){
  const common=[
    ['対象者が具体的になっている','解決する悩みが1つに絞られている','自分の経験を活かす理由が言葉になっている'],
    ['完成までの作業が順番に並んでいる','最初の版に不要な作業を外している','今日着手できる大きさになっている'],
    ['実際に使える・見せられる状態になっている','未完成の箇所が明確になっている','第三者が内容を理解できる'],
    ['誤字・計算・リンク・表示を確認した','初めて使う人の手順で試した','最低1か所をテスト結果から改善した'],
    ['手数料・原価・作業時間を確認した','赤字にならない価格になっている','購入・依頼後の流れが説明されている'],
    ['対象者・内容・価格・申込方法が揃っている','成果物や実績のサンプルが見える','誇張せず具体的な説明になっている'],
    ['公開・応募・提案を実際に1件行った','日時と送付先・公開先を記録した','次に確認する反応指標を1つ決めた']
  ];
  const checks=[...(common[index]??[])];
  if(index===4&&job.revenueModel==='時間報酬')checks[0]='準備・実施・フォローを含む作業時間で価格を確認した';
  if(index===4&&job.revenueModel==='商品販売')checks[0]='販売手数料と制作コストを差し引いて価格を確認した';
  if(index===6)checks[2]=`${job.name}の次の改善判断に使う反応を1つ決めた`;
  return checks;
}

function revenueResource(job:JobCatalogItem){
  const key=job.revenueModel==='商品販売'?'digital-market':job.revenueModel==='受託'||job.revenueModel==='時間報酬'?'freelance-market':job.revenueModel==='月額継続'?'management-tool':job.revenueModel==='広告・アフィリエイト'?'seo-course':'online-tools';
  return learningResources.find(resource=>resource.affiliateKey===key);
}

export function enrichRoadmap(job:JobCatalogItem,steps:RoadmapStep[]):EnrichedRoadmapStep[]{
  const skills=getCatalogSkills(job).map(skill=>skill.name);
  const learning=getLearningResources(skills);
  const salesResource=revenueResource(job);
  return steps.map((step,index)=>{
    const candidate=index===1?learning[0]:index===3?learning[1]:index===5?salesResource:undefined;
    const url=candidate?getAffiliateUrl(candidate.affiliateKey):'';
    return {
      ...step,
      stage:stages[index]??`STEP ${index+1}`,
      outcome:outcomeFor(step,index),
      qualityChecks:checksFor(step,index,job),
      skillGains:[skills[index%skills.length],index>=4?'販売力':'実務遂行'].filter((value,pos,array)=>array.indexOf(value)===pos),
      resource:candidate&&url?{...candidate,url}:undefined
    };
  });
}
