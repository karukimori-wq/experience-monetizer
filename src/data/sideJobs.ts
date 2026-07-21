export type Answers = Record<string,string[]>;
export type SideJob = { id:string; name:string; tags:string[]; work:string[]; roles:string[]; hobbies:string[]; life:string[]; styles:string[]; resources:string[]; priorities:string[]; avoids:string[]; base:number; reason:string };

export const sideJobs:SideJob[] = [
{id:'excel-template',name:'Excelテンプレート販売',tags:['今すぐ始めやすい'],work:['事務','経理・財務','製造'],roles:['資料作成','データ分析','改善活動'],hobbies:[],life:[],styles:['完全在宅','PC中心','一人で進めたい','好きな時間に働きたい'],resources:['PC'],priorities:['初期負担が少ない','自分の経験を活かす','スキマ時間'],avoids:[],base:42,reason:'Excelや資料作成、業務改善の経験をデジタル商品として活かせます。'},
{id:'manufacturing-writer',name:'製造業特化Webライター',tags:['少し学べば始められる'],work:['製造','研究・開発','技術・設計'],roles:['文章作成','資料作成','技術作業'],hobbies:['読書','ブログ'],life:[],styles:['完全在宅','PC中心','一人で進めたい'],resources:['PC'],priorities:['自分の経験を活かす','初期負担が少ない'],avoids:[],base:40,reason:'製造・技術の実務経験そのものを専門性として活用できます。'},
{id:'improvement-template',name:'業務改善テンプレート販売',tags:['今すぐ始めやすい'],work:['製造','事務','IT・Web'],roles:['改善活動','データ分析','資料作成','企画'],hobbies:[],life:[],styles:['完全在宅','PC中心','一人で進めたい'],resources:['PC'],priorities:['自分の経験を活かす','将来性'],avoids:[],base:41,reason:'改善活動や情報整理の経験を、再利用できるテンプレートとして販売できます。'},
{id:'web-writer',name:'Webライター',tags:['少し学べば始められる'],work:['営業','マーケティング','事務','教育'],roles:['文章作成','資料作成','顧客対応'],hobbies:['読書','ブログ'],life:['転職','就職活動','子育て','住宅購入','旅行'],styles:['完全在宅','PC中心','一人で進めたい'],resources:['PC'],priorities:['初期負担が少ない','スキマ時間'],avoids:[],base:38,reason:'仕事や人生経験をテーマに変えて、文章で価値提供しやすい副業です。'},
{id:'sns-support',name:'SNS投稿企画・運用サポート',tags:['少し学べば始められる'],work:['マーケティング','販売・接客','営業'],roles:['企画','文章作成','デザイン','顧客対応'],hobbies:['SNS','写真','動画'],life:[],styles:['主に在宅','PC中心','人と関わりたい'],resources:['スマートフォン','PC'],priorities:['好きなことを活かす','将来性'],avoids:['人とのやり取り'],base:36,reason:'SNS利用経験と企画・顧客理解を組み合わせて活かせます。'},
{id:'online-secretary',name:'オンライン秘書',tags:['今すぐ始めやすい'],work:['事務','人事・採用','営業'],roles:['資料作成','データ入力','調整','顧客対応','プロジェクト管理'],hobbies:[],life:[],styles:['完全在宅','PC中心','人と関わりたい'],resources:['PC'],priorities:['すぐ始められる','在宅'],avoids:['人とのやり取り','電話'],base:37,reason:'事務処理、調整、資料作成などの会社員経験をそのまま活かしやすい仕事です。'},
{id:'note-content',name:'経験コンテンツ・note販売',tags:['今すぐ始めやすい'],work:[],roles:['文章作成','資料作成'],hobbies:['ブログ','読書'],life:['転職','就職活動','住宅購入','家づくり','子育て','介護','資格取得','海外生活・留学','家計管理'],styles:['完全在宅','一人で進めたい','好きな時間に働きたい'],resources:['スマートフォン','PC'],priorities:['自分の経験を活かす','初期負担が少ない','スキマ時間'],avoids:[],base:39,reason:'あなた自身の人生経験を整理し、同じ課題を持つ人向けの情報として販売できます。'},
{id:'pc-support',name:'PC初心者オンラインサポート',tags:['今すぐ始めやすい'],work:['IT・Web','事務'],roles:['教育・新人指導','IT・システム','顧客対応'],hobbies:['勉強・資格取得'],life:[],styles:['主に在宅','人と関わりたい'],resources:['PC'],priorities:['自分の経験を活かす','すぐ始められる'],avoids:['人とのやり取り'],base:35,reason:'PC操作を人に教えた経験や、初心者を支える力を活かせます。'}
];

const overlap=(a:string[]|undefined,b:string[]) => (a??[]).filter(v=>b.includes(v)).length;
export function calculateMatches(answers:Answers){
 return sideJobs.map(job=>{
  let score=job.base;
  score+=Math.min(overlap(answers.work,job.work)*9,18);
  score+=Math.min(overlap(answers.role,job.roles)*7,21);
  score+=Math.min(overlap(answers.hobby,job.hobbies)*5,10);
  score+=Math.min(overlap(answers.life,job.life)*6,18);
  score+=Math.min(overlap(answers.style,job.styles)*4,12);
  score+=Math.min(overlap(answers.priority,job.priorities)*4,12);
  const resourceHits=overlap(answers.resources,job.resources);
  const readiness=Math.min(100,55+resourceHits*20+overlap(answers.style,job.styles)*5);
  const avoidPenalty=overlap(answers.avoid,job.avoids)*18;
  score=Math.max(0,Math.min(98,score-avoidPenalty));
  return {...job,score,readiness};
 }).sort((a,b)=>b.score-a.score);
}
