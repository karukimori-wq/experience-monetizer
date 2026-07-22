import type {JobCatalogItem} from './jobCatalog';
export type GrowthResource={skill:string;title:string;description:string;kind:'学習'|'ツール'|'サービス';affiliateKey?:string};
export type RoadmapStep={title:string;description:string;url?:string;linkLabel?:string};
export const growthResources:GrowthResource[]=[
{skill:'Excel',title:'Excel実践スキルを学ぶ',description:'関数、ピボット、Power Queryなど副業で価値になりやすい実務スキルから学びます。',kind:'学習',affiliateKey:'excel-course'},
{skill:'文章作成',title:'Webライティングの基礎を学ぶ',description:'読みやすい構成、見出し、リサーチ、推敲の基本を身につけます。',kind:'学習',affiliateKey:'writing-course'},
{skill:'問題解決',title:'業務改善・問題解決を体系化する',description:'経験を再現可能な型として説明できるよう、改善手法を整理します。',kind:'学習',affiliateKey:'business-course'},
{skill:'教える力',title:'オンラインで教える準備をする',description:'教材作成、画面共有、説明の組み立て方を整えます。',kind:'ツール',affiliateKey:'online-tools'},
{skill:'業界専門知識',title:'専門経験を棚卸しする',description:'担当業務、改善事例、失敗と学びをテーマ別に整理して専門性を言語化します。',kind:'サービス'}
];
const finish=(job:JobCatalogItem):RoadmapStep=>({title:'実際に1件公開・応募・提案する',description:`${job.name}を、販売ページ公開・案件応募・見込み客への提案のいずれかで実際に1件外へ出します。完了後は、使った時間・反応・改善点を活動記録に残します。`});
const has=(job:JobCatalogItem,...words:string[])=>words.some(word=>job.name.includes(word)||job.keywords.some(k=>k.includes(word)));
const steps=(items:RoadmapStep[],job:JobCatalogItem)=>[...items,finish(job)];
export function getSevenSteps(job:JobCatalogItem):RoadmapStep[]{
 const k=job.keywords.join('・');
 if(has(job,'Excelテンプレート','品質管理テンプレート','管理表','記録シート','家計管理シート'))return steps([
  {title:'販売するテンプレートの用途を1つ決める',description:`${job.name}で、誰のどの作業を楽にするかを1文で決めます。例：毎月の集計に時間がかかる小規模事業者向けの売上管理表。`},
  {title:'30分で必要なシートと入力項目を書き出す',description:'入力、集計、結果表示の順で必要なシート名と項目を箇条書きにします。最初は3〜5シート以内に絞ります。'},
  {title:'最小版を1ファイル完成させる',description:'入力→自動計算→結果確認まで一度通せる状態を完成させます。便利機能の追加は後回しにします。'},
  {title:'サンプルデータを10件入れて動作確認する',description:'計算ミス、入力しづらい箇所、見づらい表示を確認し、その場で修正します。'},
  {title:'販売用の説明画像を3枚作る',description:'「入力画面」「自動集計」「完成結果」の3枚を用意し、それぞれに何が便利か一言添えます。'},
  {title:'価格と販売ページを完成させる',description:'対象者、解決できる悩み、使い方、含まれる内容、価格を入力し、公開直前まで仕上げます。'}],job);
 if(has(job,'Notionテンプレート'))return steps([
  {title:'Notionに無料登録する',description:'Notionアカウントがなければ無料プランで登録し、テンプレート作成用のワークスペースを1つ用意します。',url:'https://www.notion.so/signup',linkLabel:'Notionに登録する'},
  {title:'販売するテンプレートの用途を1つ決める',description:'「誰が」「何を管理するために使うか」を1文で決めます。例：副業案件の進捗と売上をまとめて管理したい個人向け。'},
  {title:'必要なページとDBを5個以内で設計する',description:'ダッシュボード、案件一覧、タスク、売上など、本当に必要なページとデータベースだけを書き出します。'},
  {title:'最小版テンプレートを完成させる',description:'実際の利用順に沿って、登録→入力→確認まで一通り使える状態にします。装飾より動線を優先します。'},
  {title:'複製リンクで購入者目線のテストをする',description:'別ページまたは別アカウントで複製し、リンク切れ、権限、初期データ、説明不足を確認して修正します。'},
  {title:'販売ページ用の画像と説明文を作る',description:'トップ画面、一覧画面、入力例の3枚を用意し、対象者・使い方・得られる効果・価格を説明します。'}],job);
 if(has(job,'LINEスタンプ'))return steps([
  {title:'スタンプの利用シーンを1つ決める',description:'家族、友人、仕事など、誰との会話で使うかを1つに絞ります。'},
  {title:'使うセリフを8個書き出す',description:'挨拶、返事、感謝、了承など、実際のトークで頻繁に使う言葉を優先します。'},
  {title:'キャラクター基準画像を1枚完成させる',description:'顔、色、線、文字位置、余白の基準になる1枚を作ります。'},
  {title:'まず8個を同じルールで完成させる',description:'キャラサイズと文字位置を統一し、一覧で見たときにバラつかないようにします。'},
  {title:'スマホ表示で読みやすさを確認する',description:'小さく表示して、文字の読みやすさ、余白、誤字、似すぎた表情を確認します。'},
  {title:'販売申請用の情報を揃える',description:'タイトル、説明、価格、メイン画像、タブ画像を用意し、申請できる状態にします。'}],job);
 if(has(job,'フリマ','中古品','古本','子ども用品','工具','カメラ用品','ゲーム用品','アウトドア用品','コレクション品'))return steps([
  {title:'今日売る商品を1つ決める',description:'手元の商品から、状態確認と梱包ができるものを1つだけ選びます。'},
  {title:'売却済み商品を5件調べる',description:'同じ商品の実際に売れた価格を5件確認し、相場をメモします。'},
  {title:'10分で清掃と付属品確認をする',description:'傷、汚れ、付属品を確認し、説明文に書く注意点をメモします。'},
  {title:'写真を5枚以上撮る',description:'全体、裏面、特徴、傷、付属品が分かる写真を明るい場所で撮影します。'},
  {title:'送料と手数料を含めて価格を決める',description:'販売手数料と送料を差し引いて赤字にならない価格を設定します。'},
  {title:'商品説明を完成させる',description:'状態、付属品、発送方法、注意点を入力し、出品ボタンを押せる状態にします。'}],job);
 if(has(job,'Webライター','ライター','記事作成','コラム執筆','体験談執筆'))return steps([
  {title:'最初に応募する得意テーマを1つ決める',description:`${k}の中から、自分の経験を具体例付きで書けるテーマを1つ選びます。`},
  {title:'800〜1500字のサンプル記事を1本書く',description:'結論、理由、具体例、まとめの順で、依頼者に見せられる記事を1本完成させます。'},
  {title:'記事を共有できる形に整える',description:'誤字を直し、見出しを付け、GoogleドキュメントやPDFなどで共有できる状態にします。'},
  {title:'プロフィールを200字で作る',description:'経験、得意テーマ、対応できる内容、稼働時間、納期目安を短くまとめます。'},
  {title:'条件の合う案件を3件保存する',description:'自分の経験が活かせる案件を3件選び、報酬、納期、必要文字数を確認します。'},
  {title:'1件目に送る応募文を完成させる',description:'案件に合わせて「経験」「できること」「納期」「サンプルURL」を入れた応募文を作ります。'}],job);
 if(job.category==='教育・相談')return steps([
  {title:'相談テーマを1つに絞る',description:`${k}の中から「誰の、どんな困りごとを解決するか」を1文で決めます。`},
  {title:'60分後に得られる結果を1つ決める',description:'相談後に何が決まる、何ができるようになるかを具体的に書きます。'},
  {title:'60分の進行表を作る',description:'10分ヒアリング→30分整理・提案→15分実践→5分次の行動、のように時間配分を決めます。'},
  {title:'ヒアリング質問を5個作る',description:'現状、困りごと、理想、制約、これまで試したことの5項目を準備します。'},
  {title:'価格と実施方法を決める',description:'例：初回60分3,000円、Zoom実施。時間、料金、予約方法を1つに決めます。'},
  {title:'募集文を完成させる',description:'対象者、相談できること、60分後のゴール、料金、申込方法を入れ、公開できる文章にします。'}],job);
 if(job.revenueModel==='商品販売')return steps([
  {title:'販売する商品を1つ定義する',description:`${job.name}で「誰の、どんな悩みを、何で解決するか」を1文で決めます。`},
  {title:'商品に含める内容を3〜5項目に絞る',description:'最初に必要な機能・内容だけを書き出し、なくても困らない機能は後回しにします。'},
  {title:'最小版を1つ完成させる',description:'実際に販売・利用できる最小の商品を完成させます。'},
  {title:'購入者と同じ手順で1回使って修正する',description:'初めて使う人の目線で確認し、分かりにくい箇所を最低1つ修正します。'},
  {title:'価格と販売先を決める',description:'手数料や原価を確認し、最初の価格と販売する場所を決定します。'},
  {title:'商品画像と説明文を完成させる',description:'対象者、悩み、商品の内容、使い方、価格を掲載し、公開直前まで仕上げます。'}],job);
 if(job.revenueModel==='受託'||job.revenueModel==='時間報酬')return steps([
  {title:'最初に受ける仕事を1つ決める',description:`${job.name}で最初に受ける作業を1つに絞り、「○○を△△します」と1文で書きます。`},
  {title:'架空案件で成果物を1つ作る',description:'依頼を受けたつもりで、最初から納品まで一度やってみます。'},
  {title:'作業時間を測る',description:'開始から完成までの時間を測り、料金と納期の基準にします。'},
  {title:'見せられるサンプルを1〜3点用意する',description:'依頼者が完成イメージを判断できる成果物を用意します。'},
  {title:'料金・納期・修正条件を決める',description:'最初のサービスプランを1つ作り、対応範囲を明確にします。'},
  {title:'応募先を3件選び、1件目の応募文を作る',description:'条件の合う案件を3件保存し、そのうち1件にすぐ送れる応募文を完成させます。'}],job);
 return steps([
  {title:'この副業で提供する価値を1文で決める',description:`${job.name}で「誰に、何を、どう良くするか」を1文で書きます。`},
  {title:'最小の成果物を1つ作る',description:'実際の仕事を想定し、30〜90分で人に見せられるサンプルを1つ完成させます。'},
  {title:'必要な道具とアカウントを揃える',description:'開始に必須なアプリ、アカウント、作業環境だけを準備します。'},
  {title:'1回通して作業し、時間を測る',description:'最初から最後まで一度実行し、かかった時間と難しかった点を記録します。'},
  {title:'価格と提供条件を決める',description:'料金、納期、対応範囲を1つのプランとして決めます。'},
  {title:'募集・販売文を完成させる',description:'対象者、提供内容、価格、申込方法を入力し、公開直前まで仕上げます。'}],job);
}