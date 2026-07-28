import type {JobCatalogItem} from './jobCatalog';
export type GrowthResource={skill:string;title:string;description:string;kind:'学習'|'ツール'|'サービス';affiliateKey?:string};
export type RoadmapStep={
 title:string;
 description:string;
 purpose?:string;
 actions?:string[];
 output?:string;
 completionCriteria?:string[];
 estimatedTime?:string;
 url?:string;
 linkLabel?:string;
};
export const growthResources:GrowthResource[]=[
 {skill:'Excel',title:'Excel実践スキルを学ぶ',description:'関数、ピボット、Power Queryなど副業で価値になりやすい実務スキルから学びます。',kind:'学習',affiliateKey:'excel-course'},
 {skill:'文章作成',title:'Webライティングの基礎を学ぶ',description:'読みやすい構成、見出し、リサーチ、推敲の基本を身につけます。',kind:'学習',affiliateKey:'writing-course'},
 {skill:'問題解決',title:'業務改善・問題解決を体系化する',description:'経験を再現可能な型として説明できるよう、改善手法を整理します。',kind:'学習',affiliateKey:'business-course'},
 {skill:'教える力',title:'オンラインで教える準備をする',description:'教材作成、画面共有、説明の組み立て方を整えます。',kind:'ツール',affiliateKey:'online-tools'},
 {skill:'業界専門知識',title:'専門経験を棚卸しする',description:'担当業務、改善事例、失敗と学びをテーマ別に整理して専門性を言語化します。',kind:'サービス'}
];
const has=(job:JobCatalogItem,...words:string[])=>words.some(word=>job.name.includes(word)||job.keywords.some(k=>k.includes(word)));

function firstAction(job:JobCatalogItem):RoadmapStep{
 if(has(job,'note','体験談執筆','コラム執筆'))return {
  title:'noteの無料アカウントを作る',
  description:'まず記事を書ける場所を用意します。プロフィールや記事テーマは後で整えられるので、このステップでは登録完了だけを目指します。',
  purpose:'今日中に、最初の記事を書き始められる状態を作るため。',
  actions:['「noteを開く」を押す','メールアドレスまたは外部アカウントで会員登録する','届いた確認メールがあれば認証する','ログイン後、クリエイターページが開けることを確認する'],
  output:'自分のnoteアカウント',completionCriteria:['noteにログインできる','自分のクリエイターページを表示できる'],estimatedTime:'約10分',url:'https://note.com/signup',linkLabel:'noteの無料登録を開く'
 };
 if(has(job,'ブログ','WordPress','アフィリエイトサイト'))return {
  title:'ブログを公開するサーバーを1つ選ぶ',
  description:'WordPressブログには公開場所となるサーバーが必要です。比較で止まらないよう、最初はWordPress簡単設定に対応した候補から1つ選びます。',
  purpose:'WordPressをインターネット上に公開できる土台を用意するため。',
  actions:['サーバー公式ページを開く','料金と契約期間を確認する','WordPress簡単設定の有無を確認する','申込みを開始するか、候補として保存する'],
  output:'利用するサーバー候補1社',completionCriteria:['サーバー名を1社決めた','料金と契約期間を確認した','次に申込みを進められる'],estimatedTime:'約15分',url:'https://www.xserver.ne.jp/',linkLabel:'サーバー候補を見る'
 };
 if(has(job,'Notionテンプレート'))return {
  title:'Notionの無料アカウントを作る',description:'テンプレート制作に使う作業場所を先に用意します。',purpose:'今日からテンプレートを作り始められる状態にするため。',actions:['Notionの登録ページを開く','無料アカウントを作成する','テンプレート制作用のページを1つ作る'],output:'Notionアカウントと空の制作ページ',completionCriteria:['Notionにログインできる','新しいページを1つ作成した'],estimatedTime:'約10分',url:'https://www.notion.so/signup',linkLabel:'Notionに無料登録する'
 };
 if(has(job,'LINEスタンプ'))return {
  title:'LINE Creators Marketに登録する',description:'スタンプを販売申請できる公式アカウントを先に準備します。',purpose:'完成した画像をすぐ申請できる状態にするため。',actions:['LINE Creators Marketを開く','LINEアカウントでログインする','クリエイター登録を完了する','マイページが表示できることを確認する'],output:'LINE Creators Marketのクリエイターアカウント',completionCriteria:['マイページにログインできる','新規登録ボタンを確認できる'],estimatedTime:'約10分',url:'https://creator.line.me/',linkLabel:'LINE Creators Marketを開く'
 };
 if(has(job,'フリマ','中古品','古本','子ども用品','工具','カメラ用品','ゲーム用品','アウトドア用品','コレクション品'))return {
  title:'今日出品する商品を1つ手元に置く',description:'調査から始めず、実物を1つ選ぶことで出品作業を具体化します。',purpose:'「何を売るか」で迷う時間を終わらせるため。',actions:['家の中から売れそうな物を3つ見る','壊れていない物を選ぶ','付属品を集める','作業場所に商品を置く'],output:'今日出品する商品1点',completionCriteria:['商品が1点に決まっている','本体と付属品が手元に揃っている'],estimatedTime:'約10分'
 };
 if(has(job,'Webライター','ライター','記事作成'))return {
  title:'サンプル記事を書く場所を1つ作る',description:'応募前に、依頼者へ見せられる記事を書く場所を用意します。Googleドキュメントなら無料ですぐ始められます。',purpose:'今日からサンプル記事を書き始められる状態にするため。',actions:['Googleドキュメントを開く','空白のドキュメントを作る','タイトルに「サンプル記事」と入力する','共有設定を確認する'],output:'空のサンプル記事ドキュメント1件',completionCriteria:['ドキュメントを保存できた','あとから共有リンクを発行できる'],estimatedTime:'約5分',url:'https://docs.google.com/document/',linkLabel:'Googleドキュメントを開く'
 };
 if(job.category==='教育・相談')return {
  title:'相談サービスの仮タイトルを1つ書く',description:'サービス全体を作り込む前に、誰を何で助けるかを短いタイトルにします。',purpose:'提供内容を具体化し、次の設計を迷わなくするため。',actions:['助けたい相手を1人想像する','その人の悩みを1つ書く','「○○な人向け△△相談」の形でタイトルを作る'],output:'相談サービスの仮タイトル1案',completionCriteria:['対象者が分かる','相談内容が分かる','1文で保存した'],estimatedTime:'約15分'
 };
 if(job.revenueModel==='商品販売')return {title:'販売する最小の商品を1文で決める',description:'大きな商品を考えず、最初に作って見せられる最小単位を決めます。',purpose:'作るものを明確にして、今日の制作へ進むため。',actions:['使ってほしい人を1人決める','解決する困りごとを1つ決める','渡す成果物を1つ決める','「誰向けの何」を1文で保存する'],output:'商品の一文定義',completionCriteria:['対象者が書かれている','困りごとが1つに絞られている','渡す成果物が明確'],estimatedTime:'約15分'};
 if(job.revenueModel==='受託'||job.revenueModel==='時間報酬')return {title:'最初に受ける作業を1つに絞る',description:'「何でもできます」ではなく、最初に提案する具体的な作業を1つ決めます。',purpose:'サンプル作成と案件探しの方向を決めるため。',actions:['自分が経験した作業を3つ書く','30〜90分で試せる作業を1つ選ぶ','「○○を△△します」と1文にする'],output:'最初に提供する作業の一文',completionCriteria:['作業が1つに絞れている','依頼者が完成物を想像できる'],estimatedTime:'約15分'};
 return {title:'この副業で今日やる最小行動を1つ決める',description:`${job.name}を調べ続けるのではなく、今日中に終えられる最小の行動へ落とします。`,purpose:'考える段階から、実際に始めた状態へ移るため。',actions:['必要そうな行動を3つ書く','30分以内で終わるものを1つ選ぶ','実行する時間を決める'],output:'今日実行する最初の行動1件',completionCriteria:['行動が1つに決まった','実行時間を決めた'],estimatedTime:'約10分'};
}

const finish=(job:JobCatalogItem):RoadmapStep=>({title:'実際に1件公開・応募・提案する',description:`${job.name}を、販売ページ公開・案件応募・見込み客への提案のいずれかで実際に1件外へ出します。完了後は、使った時間・反応・改善点を活動記録に残します。`});
const steps=(items:RoadmapStep[],job:JobCatalogItem)=>[firstAction(job),...items.slice(1),finish(job)];
export function getSevenSteps(job:JobCatalogItem):RoadmapStep[]{
 const k=job.keywords.join('・');
 if(has(job,'Excelテンプレート','品質管理テンプレート','管理表','記録シート','家計管理シート'))return steps([
  {},{title:'30分で必要なシートと入力項目を書き出す',description:'入力、集計、結果表示の順で必要なシート名と項目を箇条書きにします。最初は3〜5シート以内に絞ります。'},
  {title:'最小版を1ファイル完成させる',description:'入力→自動計算→結果確認まで一度通せる状態を完成させます。'},
  {title:'サンプルデータを10件入れて動作確認する',description:'計算ミス、入力しづらい箇所、見づらい表示を確認します。'},
  {title:'販売用の説明画像を3枚作る',description:'入力画面、自動集計、完成結果の3枚を用意します。'},
  {title:'価格と販売ページを完成させる',description:'対象者、解決できる悩み、使い方、内容、価格を入力します。'}],job);
 if(has(job,'Webライター','ライター','記事作成','コラム執筆','体験談執筆'))return steps([{},
  {title:'800〜1500字のサンプル記事を1本書く',description:'結論、理由、具体例、まとめの順で記事を完成させます。'},
  {title:'記事を共有できる形に整える',description:'誤字を直し、見出しを付け、共有できる状態にします。'},
  {title:'プロフィールを200字で作る',description:'経験、得意テーマ、対応内容、稼働時間、納期目安をまとめます。'},
  {title:'条件の合う案件を3件保存する',description:'報酬、納期、必要文字数を確認します。'},
  {title:'1件目に送る応募文を完成させる',description:'経験、できること、納期、サンプルURLを入れます。'}],job);
 if(job.category==='教育・相談')return steps([{},
  {title:'60分後に得られる結果を1つ決める',description:'相談後に何が決まるかを具体的に書きます。'},
  {title:'60分の進行表を作る',description:'ヒアリング、整理、提案、実践、次の行動の時間配分を決めます。'},
  {title:'ヒアリング質問を5個作る',description:'現状、困りごと、理想、制約、試したことを準備します。'},
  {title:'価格と実施方法を決める',description:'時間、料金、予約方法を1つに決めます。'},
  {title:'募集文を完成させる',description:'対象者、相談内容、ゴール、料金、申込方法を入れます。'}],job);
 if(job.revenueModel==='商品販売')return steps([{},
  {title:'商品に含める内容を3〜5項目に絞る',description:'最初に必要な内容だけを書き出します。'},
  {title:'最小版を1つ完成させる',description:'販売・利用できる最小の商品を完成させます。'},
  {title:'購入者と同じ手順で1回使って修正する',description:'分かりにくい箇所を最低1つ修正します。'},
  {title:'価格と販売先を決める',description:'手数料や原価を確認します。'},
  {title:'商品画像と説明文を完成させる',description:'対象者、内容、使い方、価格を掲載します。'}],job);
 if(job.revenueModel==='受託'||job.revenueModel==='時間報酬')return steps([{},
  {title:'架空案件で成果物を1つ作る',description:'依頼を受けたつもりで、最初から納品まで一度行います。'},
  {title:'作業時間を測る',description:'料金と納期の基準にします。'},
  {title:'見せられるサンプルを1〜3点用意する',description:'完成イメージを判断できる成果物を用意します。'},
  {title:'料金・納期・修正条件を決める',description:'最初のサービスプランを1つ作ります。'},
  {title:'応募先を3件選び、1件目の応募文を作る',description:'条件の合う案件を保存して応募文を完成させます。'}],job);
 return steps([{},
  {title:'最小の成果物を1つ作る',description:'30〜90分で人に見せられるサンプルを作ります。'},
  {title:'必要な道具とアカウントを揃える',description:'必須なアプリ、アカウント、作業環境だけを準備します。'},
  {title:'1回通して作業し、時間を測る',description:'かかった時間と難しかった点を記録します。'},
  {title:'価格と提供条件を決める',description:'料金、納期、対応範囲を決めます。'},
  {title:'募集・販売文を完成させる',description:'対象者、提供内容、価格、申込方法を入力します。'}],job);
}
