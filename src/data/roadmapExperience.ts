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

const stages=['最初の一歩','準備する','形にする','確かめる','売れる状態にする','公開準備','市場へ出す'];

function outcomeFor(step:RoadmapStep,index:number){
  const defaults=['最初の行動が完了している','作るもの・進め方が具体的に決まっている','人に見せられる最小成果物が完成している','利用者・依頼者の目線で確認できている','価格・条件・見せ方が決まっている','公開・応募・提案をすぐ実行できる','実際に1件、市場へ出している'];
  return step.output??defaults[index]??step.title??'成果物が完成している';
}

function checksFor(step:RoadmapStep,index:number,job:JobCatalogItem){
  if(step.completionCriteria?.length)return step.completionCriteria;
  const common=[
    ['今日中に実行できる行動になっている','実際に手を動かした','次に進める状態になっている'],
    ['完成までの作業が順番に並んでいる','最初の版に不要な作業を外している','今日着手できる大きさになっている'],
    ['実際に使える・見せられる状態になっている','未完成の箇所が明確になっている','第三者が内容を理解できる'],
    ['誤字・計算・リンク・表示を確認した','初めて使う人の手順で試した','最低1か所を改善した'],
    ['手数料・原価・作業時間を確認した','赤字にならない価格になっている','購入・依頼後の流れが説明されている'],
    ['対象者・内容・価格・申込方法が揃っている','成果物や実績のサンプルが見える','誇張せず具体的な説明になっている'],
    ['公開・応募・提案を実際に1件行った','日時と公開先を記録した',`${job.name}の次の改善に使う反応を1つ決めた`]
  ];
  return common[index]??['成果物が完成している'];
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
    return {...step,stage:stages[index]??`STEP ${index+1}`,outcome:outcomeFor(step,index),qualityChecks:checksFor(step,index,job),skillGains:[skills[index%Math.max(skills.length,1)]??'実務遂行',index>=4?'販売力':'実務遂行'].filter((value,pos,array)=>array.indexOf(value)===pos),resource:candidate&&url?{...candidate,url}:undefined};
  });
}
