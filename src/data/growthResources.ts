export type GrowthResource={skill:string;title:string;description:string;kind:'学習'|'ツール'|'サービス';affiliateKey?:string};
export const growthResources:GrowthResource[]=[
{skill:'Excel',title:'Excel実践スキルを学ぶ',description:'関数、ピボット、Power Queryなど副業で価値になりやすい実務スキルから学びます。',kind:'学習',affiliateKey:'excel-course'},
{skill:'文章作成',title:'Webライティングの基礎を学ぶ',description:'読みやすい構成、見出し、リサーチ、推敲の基本を身につけます。',kind:'学習',affiliateKey:'writing-course'},
{skill:'問題解決',title:'業務改善・問題解決を体系化する',description:'経験を再現可能な型として説明できるよう、改善手法を整理します。',kind:'学習',affiliateKey:'business-course'},
{skill:'教える力',title:'オンラインで教える準備をする',description:'教材作成、画面共有、説明の組み立て方を整えます。',kind:'ツール',affiliateKey:'online-tools'},
{skill:'業界専門知識',title:'専門経験を棚卸しする',description:'担当業務、改善事例、失敗と学びをテーマ別に整理して専門性を言語化します。',kind:'サービス'}
];
export const sevenSteps=[
{title:'副業候補を1つに絞る',description:'マッチ度だけでなく、時間・働き方・避けたい条件も含めて選びます。'},
{title:'不足スキルを確認する',description:'必要スキルと現在値の差から、最初に伸ばす項目を1〜2個に絞ります。'},
{title:'最低限の学習・準備をする',description:'高額な初期投資は避け、開始に必要な最低限だけを準備します。'},
{title:'小さな成果物を1つ作る',description:'テンプレート、記事、サンプルなど、実力を見せられるものを作ります。'},
{title:'販売・受注する場所を決める',description:'自分の商品型か受託型かに合わせて、販売先や案件獲得先を選びます。'},
{title:'最初の1件を目標に公開する',description:'完璧を目指さず、小さく公開・応募して反応を確認します。'},
{title:'実績を振り返り改善する',description:'使った時間、収益、反応を記録し、続ける・伸ばす・別候補を試すを判断します。'}
];
