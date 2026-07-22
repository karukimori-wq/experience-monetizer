import type {JobCatalogItem} from './jobCatalog';
export type GrowthResource={skill:string;title:string;description:string;kind:'学習'|'ツール'|'サービス';affiliateKey?:string};
export type RoadmapStep={title:string;description:string};
export const growthResources:GrowthResource[]=[
{skill:'Excel',title:'Excel実践スキルを学ぶ',description:'関数、ピボット、Power Queryなど副業で価値になりやすい実務スキルから学びます。',kind:'学習',affiliateKey:'excel-course'},
{skill:'文章作成',title:'Webライティングの基礎を学ぶ',description:'読みやすい構成、見出し、リサーチ、推敲の基本を身につけます。',kind:'学習',affiliateKey:'writing-course'},
{skill:'問題解決',title:'業務改善・問題解決を体系化する',description:'経験を再現可能な型として説明できるよう、改善手法を整理します。',kind:'学習',affiliateKey:'business-course'},
{skill:'教える力',title:'オンラインで教える準備をする',description:'教材作成、画面共有、説明の組み立て方を整えます。',kind:'ツール',affiliateKey:'online-tools'},
{skill:'業界専門知識',title:'専門経験を棚卸しする',description:'担当業務、改善事例、失敗と学びをテーマ別に整理して専門性を言語化します。',kind:'サービス'}
];
const finish=(job:JobCatalogItem):RoadmapStep=>({title:'数字を確認して改善する',description:`${job.name}に使った時間、売上、反応を記録し、価格・内容・集客方法のうち改善する点を1つ決めます。`});
export function getSevenSteps(job:JobCatalogItem):RoadmapStep[]{
 const k=job.keywords.join('・');
 if(job.name.includes('ブログ'))return[
  {title:'発信テーマと読者を決める',description:`${k}の経験から、誰のどんな悩みを解決するブログにするかを1つに絞ります。`},
  {title:'ブログの発信環境を整える',description:'ブログサービスやサイトを準備し、プロフィール・カテゴリ・基本ページを整えます。'},
  {title:'記事テーマを10本決める',description:'自分の経験と検索される悩みを組み合わせ、最初に書く記事の候補を10本作ります。'},
  {title:'最初の記事を3本公開する',description:'体験・失敗・比較・解決策を盛り込み、読者に役立つ記事をまず3本公開します。'},
  {title:'検索とSNSから読者を集める',description:'SEOの基本を整え、必要に応じてSNSでも記事を紹介してアクセス経路を作ります。'},
  {title:'収益につながる導線を作る',description:'記事内容に合う広告やアフィリエイトを選び、読者の役に立つ自然な位置に導線を設置します。'},finish(job)];
 if(job.revenueModel==='商品販売')return[
  {title:'売る相手と悩みを1つ決める',description:`${k}を活かして、${job.name}を必要とする人と解決したい悩みを具体化します。`},
  {title:'商品の中身と価格を決める',description:'最小構成の商品内容、利用場面、価格を決め、作り込みすぎない販売単位にします。'},
  {title:'最小版を1つ作る',description:`まず販売できる${job.name}の試作品を1つ完成させます。`},
  {title:'実際に使って品質を確認する',description:'自分または想定利用者の視点で使い、分かりにくさ・不足・使いにくさを修正します。'},
  {title:'販売ページを作る',description:'誰向けの商品か、何ができるか、使い方、価格が短時間で伝わる紹介ページを作ります。'},
  {title:'販売を開始して最初の1件を目指す',description:'商品に合う販売先へ公開し、SNSや既存の発信先から最初の購入につなげます。'},finish(job)];
 if(job.revenueModel==='受託'||job.revenueModel==='時間報酬')return[
  {title:'提供する仕事の範囲を決める',description:`${job.name}で対応する作業と、対応しない作業を明確にします。`},
  {title:'必要スキルを1つ補強する',description:`${k}の中から案件獲得に直結するスキルを1つ選び、実務で使えるレベルまで練習します。`},
  {title:'実績サンプルを作る',description:'依頼前でも仕事内容が伝わるよう、架空案件や自分用の成果物を1〜3点用意します。'},
  {title:'サービス内容と料金を決める',description:'作業範囲、納期、修正回数、料金の目安を決め、依頼者が判断しやすい形にします。'},
  {title:'案件を探す場所を決める',description:'クラウドソーシング、スキル販売、知人紹介など、この仕事と相性の良い獲得経路を1〜2個選びます。'},
  {title:'最初の案件に応募・出品する',description:'条件の合う小規模案件から応募またはサービス出品を行い、最初の実績獲得を目指します。'},finish(job)];
 if(job.revenueModel==='月額継続')return[
  {title:'継続して支援する相手を決める',description:`${job.name}を毎月必要とする顧客像と、その顧客が抱える課題を明確にします。`},
  {title:'月額サービスの範囲を決める',description:'毎月行う作業、回数、納品物、連絡方法を決めてサービスを定型化します。'},
  {title:'作業テンプレートを準備する',description:'繰り返し作業を効率化できるチェックリストや管理表、報告フォーマットを作ります。'},
  {title:'お試しプランを作る',description:'初回だけ試しやすい小さなプランを用意し、継続契約前に価値を体験できるようにします。'},
  {title:'見込み顧客に提案する',description:'スキル販売サイトや直接提案などから、課題が合う相手にサービス内容を伝えます。'},
  {title:'最初の継続契約を作る',description:'初回支援の結果を確認し、翌月も続けるメリットと改善案を提示して継続につなげます。'},finish(job)];
 if(job.revenueModel==='広告・アフィリエイト'||job.revenueModel==='成果報酬')return[
  {title:'発信するテーマと対象者を決める',description:`${k}の経験を軸に、誰に何を届ける発信かを明確にします。`},
  {title:'収益につながるテーマを調べる',description:'読者の悩みと紹介できる商品・サービスが自然につながるテーマを選びます。'},
  {title:'発信媒体を1つに絞る',description:'ブログやSNSなど、自分が継続しやすく対象者に届きやすい媒体から1つ選びます。'},
  {title:'役立つコンテンツを作る',description:'体験談、比較、使い方、失敗例など、自分の経験が価値になるコンテンツを公開します。'},
  {title:'収益導線を設置する',description:'内容に合う広告やアフィリエイト案件を選び、読者の判断を助ける形で紹介します。'},
  {title:'アクセスを増やす',description:'検索やSNSから継続的に見てもらえるよう、既存コンテンツの改善と新規発信を続けます。'},finish(job)];
 return[
  {title:'仕事内容を具体化する',description:`${job.name}で実際に提供する価値と対象者を明確にします。`},
  {title:'必要スキルを確認する',description:`${k}を中心に、開始前に必要なスキルを確認します。`},
  {title:'最小限の準備をする',description:'必要な道具や環境だけを揃え、初期投資を抑えて開始準備をします。'},
  {title:'小さく試してみる',description:'最小単位で仕事を試し、実際の作業時間や難しさを確認します。'},
  {title:'価格と提供方法を決める',description:'収益モデルに合わせて料金と提供方法を決めます。'},
  {title:'最初の顧客を探す',description:'仕事内容に合う場所で募集・販売・提案を開始します。'},finish(job)];
}
