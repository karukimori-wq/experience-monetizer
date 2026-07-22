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
const finish=(job:JobCatalogItem):RoadmapStep=>({title:'数字を確認して次の改善を決める',description:`${job.name}に使った時間、売上、閲覧・問い合わせ・購入などの反応を記録し、次に改善する点を1つ決めます。`});
const has=(job:JobCatalogItem,...words:string[])=>words.some(word=>job.name.includes(word)||job.keywords.some(k=>k.includes(word)));
const steps=(items:RoadmapStep[],job:JobCatalogItem)=>[...items,finish(job)];
export function getSevenSteps(job:JobCatalogItem):RoadmapStep[]{
 const k=job.keywords.join('・');
 if(has(job,'Excelテンプレート','品質管理テンプレート','管理表','記録シート','家計管理シート'))return steps([
  {title:'使う人と業務シーンを決める',description:`${k}を使う人が、どの作業を楽にしたいのかを1つに絞ります。`},
  {title:'入力項目と完成イメージを設計する',description:'入力する項目、計算結果、一覧・グラフなど、購入者が得たい結果からシート構成を決めます。'},
  {title:'最小版のテンプレートを作る',description:'必要な関数・入力規則・書式だけで、まず最後まで使える1ファイルを完成させます。'},
  {title:'実データで動作確認する',description:'サンプルデータを入力し、計算ミス、入力しづらい箇所、印刷やスマホ閲覧時の崩れを確認します。'},
  {title:'説明書とサンプル画像を作る',description:'購入後すぐ使える簡単な操作説明と、テンプレートの価値が伝わる画面サンプルを用意します。'},
  {title:'販売ページを公開する',description:'対象者、解決できる悩み、主な機能、利用例、価格を掲載して販売を開始します。'}],job);
 if(has(job,'Notionテンプレート'))return steps([
  {title:'利用シーンを1つに絞る',description:'誰が何を管理するテンプレートなのかを明確にします。'},
  {title:'ページとデータベース構成を設計する',description:'必要なページ、プロパティ、ビュー、関連付けを最小構成で決めます。'},
  {title:'テンプレート本体を作る',description:'実際の利用順に沿って迷わず使える状態まで組み上げます。'},
  {title:'複製して初期状態をテストする',description:'購入者と同じように複製し、リンク切れや不要なサンプルデータがないか確認します。'},
  {title:'使い方ガイドを作る',description:'最初に触る場所と基本操作を短い説明や画像でまとめます。'},
  {title:'販売・配布ページを公開する',description:'利用例とメリットが伝わるページを作り、購入後の複製導線まで確認します。'}],job);
 if(has(job,'Canvaテンプレート'))return steps([
  {title:'用途とデザイン方向を決める',description:'SNS投稿、資料、告知など用途を1つ決め、対象者に合うデザイン方向を定めます。'},
  {title:'必要なサイズとページ構成を決める',description:'利用媒体に合うサイズと、セットに含めるテンプレート数を決めます。'},
  {title:'編集しやすいテンプレートを作る',description:'文字・写真・色を購入者が差し替えやすい構造で制作します。'},
  {title:'別アカウント視点で編集確認する',description:'共有リンクから開き、複製と編集が問題なくできるか確認します。'},
  {title:'使用例のモックアップを作る',description:'完成後の見え方が一目で分かるサンプル画像を用意します。'},
  {title:'販売ページと共有導線を整える',description:'内容、利用条件、編集方法を明記し、購入後に迷わず受け取れる状態で公開します。'}],job);
 if(has(job,'LINEスタンプ'))return steps([
  {title:'キャラクターと利用シーンを決める',description:'誰がどんな会話で使うスタンプかを決め、キャラクターの表情や口調を統一します。'},
  {title:'使われるセリフを選ぶ',description:'挨拶、返事、感謝など日常で使いやすいセリフをセットとして整理します。'},
  {title:'絵柄とレイアウトを統一する',description:'キャラクターのサイズ、文字位置、余白を揃えて各スタンプを制作します。'},
  {title:'画像仕様を確認して書き出す',description:'登録に必要な画像サイズや背景透過などを確認し、提出用データを揃えます。'},
  {title:'一覧で見て品質を確認する',description:'小さく表示した時の読みやすさ、似すぎた表情、誤字などをまとめて確認します。'},
  {title:'販売申請と紹介準備をする',description:'販売情報を入力して申請し、公開後に紹介できる画像や文章も用意します。'}],job);
 if(has(job,'写真素材'))return steps([
  {title:'売る写真テーマを決める',description:'仕事、暮らし、地域など需要を想定し、まず1テーマに撮影対象を絞ります。'},
  {title:'必要なカットをリスト化する',description:'横・縦、余白あり、人物なしなど購入者が使いやすいバリエーションを決めます。'},
  {title:'まとまった枚数を撮影する',description:'光、ピント、背景を意識して同じテーマで複数の使える素材を撮影します。'},
  {title:'選別とレタッチを行う',description:'ブレや重複を除き、自然な明るさと色味に整えて品質を揃えます。'},
  {title:'タイトルと検索タグを付ける',description:'購入者が検索しそうな用途や被写体を具体的なキーワードとして登録します。'},
  {title:'素材サイトへ公開する',description:'権利関係を確認したうえで登録し、審査結果を見ながら次の撮影テーマを決めます。'}],job);
 if(has(job,'フリマ','中古品','古本','子ども用品','工具','カメラ用品','ゲーム用品','アウトドア用品','コレクション品'))return steps([
  {title:'販売する商品を選ぶ',description:'手元の商品または扱うジャンルから、状態と相場を確認できるものを選びます。'},
  {title:'相場と売れた価格を調べる',description:'出品価格だけでなく実際の売却例を見て、送料を含めた利益の目安を確認します。'},
  {title:'状態確認と清掃をする',description:'傷や付属品を確認し、購入者に正確に伝えられる状態に整えます。'},
  {title:'写真と説明文を作る',description:'全体、特徴、傷などが分かる写真を撮り、状態と発送条件を明記します。'},
  {title:'利益が残る価格で出品する',description:'販売手数料と送料を差し引いて赤字にならない価格を設定します。'},
  {title:'発送と取引対応を標準化する',description:'梱包方法と発送手順を決め、売れた後の作業時間を減らします。'}],job);
 if(has(job,'ハンドメイド'))return steps([
  {title:'販売する作品を1種類に絞る',description:'得意な制作物から、材料費と制作時間を把握しやすい商品を選びます。'},
  {title:'試作品を作り原価を計算する',description:'材料費、梱包費、手数料、制作時間を記録して販売価格の基準を作ります。'},
  {title:'品質と制作手順を安定させる',description:'同じ品質で繰り返し作れるよう工程と必要時間を確認します。'},
  {title:'商品写真を撮影する',description:'サイズ感、質感、使用イメージが伝わる写真を用意します。'},
  {title:'商品説明と価格を決める',description:'素材、サイズ、注意点、発送日数を明記して購入判断しやすくします。'},
  {title:'販売を開始して反応を見る',description:'まず少数を出品し、閲覧・お気に入り・購入の反応から改善します。'}],job);
 if(has(job,'旅行プラン','観光情報コンテンツ'))return steps([
  {title:'対象となる旅行者を決める',description:'子連れ、一人旅、短時間観光など、誰向けのプランかを明確にします。'},
  {title:'エリアと旅の条件を設定する',description:'日数、移動手段、予算感、季節などプランの前提条件を決めます。'},
  {title:'スポットと移動時間を調べる',description:'営業時間や位置関係を確認し、無理なく回れる順序に組み立てます。'},
  {title:'実用的な旅程にまとめる',description:'時間割、地図、食事、雨天時の代替案など利用者がそのまま使える情報を整理します。'},
  {title:'読みやすい商品データにする',description:'PDFやWebページなど、スマホで確認しやすい形式に整えます。'},
  {title:'サンプルを見せて販売する',description:'旅程の一部をサンプル公開し、対象者と得られる体験が伝わる販売ページを作ります。'}],job);
 if(has(job,'Webライター','ライター','記事作成','コラム執筆','体験談執筆'))return steps([
  {title:'得意ジャンルを1つ決める',description:`${k}の経験から、最初に案件を取る執筆ジャンルを絞ります。`},
  {title:'記事構成とリサーチを練習する',description:'検索意図、見出し構成、情報源の確認など納品に必要な基本手順を身につけます。'},
  {title:'ポートフォリオ記事を作る',description:'得意ジャンルで1〜3本の記事を書き、文章力と専門性を見せられる状態にします。'},
  {title:'プロフィールと料金目安を整える',description:'経験、対応ジャンル、納期、文字単価など依頼者が判断する情報をまとめます。'},
  {title:'条件の合う案件を探す',description:'初心者向けだけでなく、自分の実務・生活経験が評価される案件を優先して探します。'},
  {title:'小規模案件から応募する',description:'応募文を案件ごとに調整し、まず1件の納品と評価獲得を目指します。'}],job);
 if(has(job,'ブログ','情報発信','体験コンテンツ')&&job.revenueModel==='広告・アフィリエイト')return steps([
  {title:'発信テーマと読者を決める',description:`${k}の経験から、誰のどんな悩みを解決する発信にするかを1つに絞ります。`},
  {title:'発信媒体と収益方法を決める',description:'ブログやコンテンツ媒体を選び、広告・アフィリエイトなどテーマと相性の良い収益方法を確認します。'},
  {title:'読者の悩みから10テーマ作る',description:'自分が書きたいことではなく、読者が知りたい疑問・比較・失敗回避を中心にテーマを作ります。'},
  {title:'最初の3コンテンツを公開する',description:'実体験と具体例を入れ、読者が行動できる内容をまず3本公開します。'},
  {title:'検索・SNSから入口を作る',description:'検索キーワードやSNS投稿を使い、コンテンツを見つけてもらう経路を作ります。'},
  {title:'収益導線を追加する',description:'内容に合う商品・サービスだけを選び、読者の判断を助ける位置に自然な導線を設置します。'}],job);
 if(has(job,'SNS運用','運用支援','投稿企画','コンテンツ作成')&&job.category==='SNS・マーケ')return steps([
  {title:'支援するSNSと顧客像を決める',description:`${job.name}で扱う媒体と、店舗・企業・個人など最初に狙う顧客を絞ります。`},
  {title:'提供範囲を決める',description:'企画、投稿作成、画像、予約投稿、コメント対応、分析など対応する作業を明確にします。'},
  {title:'1か月分の運用サンプルを作る',description:'投稿テーマ、カレンダー、サンプル投稿を作り、支援内容を見える形にします。'},
  {title:'月額プランと作業ルールを決める',description:'投稿本数、修正回数、連絡方法、料金を定型化します。'},
  {title:'実績として見せる資料を作る',description:'サンプルと改善の考え方を短くまとめ、依頼前に品質が伝わる資料を用意します。'},
  {title:'最初の顧客へ提案する',description:'対象に合う事業者へ、お試しまたは小さな月額プランから提案します。'}],job);
 if(has(job,'バナー','サムネイル','Instagram画像','SNS画像','ブログ図解','資料表紙','電子書籍表紙','イベント告知','店舗メニュー','名刺','簡易ロゴ','デザイン','制作'))return steps([
  {title:'制作ジャンルを1つに絞る',description:`${job.name}の中で、最初に受注する制作物と対象業界を決めます。`},
  {title:'参考デザインを集めて分析する',description:'サイズ、文字量、配色、視線誘導など成果物に必要な要素を整理します。'},
  {title:'サンプルを3点作る',description:'架空案件でもよいので、異なる用途の制作例を用意します。'},
  {title:'ポートフォリオにまとめる',description:'完成画像だけでなく、目的や工夫も短く添えて依頼者が判断しやすくします。'},
  {title:'料金と修正条件を決める',description:'制作範囲、納期、修正回数、納品形式を決めます。'},
  {title:'出品・応募を開始する',description:'制作物と相性の良い案件や販売先から、小規模な仕事に応募します。'}],job);
 if(has(job,'動画','切り抜き'))return steps([
  {title:'編集する動画ジャンルを決める',description:'YouTube、ショート動画など、最初に対応する形式を1つに絞ります。'},
  {title:'基本編集を一通り練習する',description:'カット、テロップ、音量調整、書き出しまでの一連の作業を練習します。'},
  {title:'サンプル動画を2〜3本作る',description:'短い素材を使い、編集前後の違いが分かる実績を作ります。'},
  {title:'作業時間を測って料金を決める',description:'1本あたりの編集時間を確認し、作業量に見合う料金を設定します。'},
  {title:'依頼時の確認項目を作る',description:'素材、完成イメージ、尺、納期、修正回数を最初に確認できるようにします。'},
  {title:'小規模案件から受注する',description:'短尺や簡単な編集案件から始め、納品実績を増やします。'}],job);
 if(job.category==='教育・相談')return steps([
  {title:'教える・相談に乗るテーマを絞る',description:`${k}の中から、自分の経験で具体的に支援できるテーマを1つ決めます。`},
  {title:'対象者とゴールを決める',description:'初心者など対象レベルと、1回の支援でどこまで到達させるかを明確にします。'},
  {title:'60分の進行を作る',description:'ヒアリング、説明・実践、質問、次の行動までの流れを組み立てます。'},
  {title:'教材・チェックリストを準備する',description:'画面共有資料や確認項目など、説明を安定させる最低限の資料を用意します。'},
  {title:'料金と予約方法を決める',description:'時間、料金、実施方法、キャンセル条件を分かりやすく設定します。'},
  {title:'モニターまたは初回相談を募集する',description:'小さく実施して質問やつまずきを集め、サービス内容を改善します。'}],job);
 if(job.category==='事務・サポート')return steps([
  {title:'代行する作業を明確にする',description:`${job.name}で受ける作業、必要な情報、納品物を具体化します。`},
  {title:'標準手順を作る',description:'依頼受付から作業、確認、納品までをチェックリストにします。'},
  {title:'サンプル成果物を作る',description:'実際の依頼を想定したサンプルを作り、品質と作業時間を確認します。'},
  {title:'情報管理ルールを決める',description:'顧客データやファイルの受け渡し、保存、削除方法を決めます。'},
  {title:'料金と納期を設定する',description:'作業量を基準に、時間制または件数制の料金と標準納期を決めます。'},
  {title:'小さな案件から受注する',description:'対応範囲が明確な案件から始め、作業手順と見積もり精度を改善します。'}],job);
 if(job.category==='専門スキル')return steps([
  {title:'専門経験を実績として整理する',description:`${k}に関する担当業務、改善例、成果を守秘義務に配慮して整理します。`},
  {title:'解決できる課題を1つ決める',description:'何でも相談ではなく、品質、改善、資料作成など最初の提供価値を絞ります。'},
  {title:'提供物の型を作る',description:'ヒアリング項目、分析手順、報告書やテンプレートなど再利用できる型を準備します。'},
  {title:'サンプル事例を作る',description:'公開可能な架空ケースで、課題から提案までの流れを見せられるようにします。'},
  {title:'範囲・料金・責任境界を決める',description:'対応範囲、納期、成果物、専門判断の限界を明確にします。'},
  {title:'経験が刺さる顧客へ提案する',description:'業界や課題が近い相手に絞り、具体的な支援内容を提示します。'}],job);
 if(job.revenueModel==='商品販売')return steps([
  {title:'売る相手と悩みを1つ決める',description:`${k}を活かして、${job.name}を必要とする人と解決したい悩みを具体化します。`},
  {title:'商品の中身と価格を決める',description:'最小構成の商品内容、利用場面、価格を決めます。'},
  {title:'最小版を1つ作る',description:`まず販売できる${job.name}の試作品を1つ完成させます。`},
  {title:'実際に使って品質を確認する',description:'想定利用者の視点で使い、分かりにくさや不足を修正します。'},
  {title:'販売ページを作る',description:'誰向けの商品か、何ができるか、使い方、価格を分かりやすく伝えます。'},
  {title:'販売を開始する',description:'商品に合う販売先へ公開し、最初の購入を目指します。'}],job);
 if(job.revenueModel==='受託'||job.revenueModel==='時間報酬')return steps([
  {title:'提供する仕事の範囲を決める',description:`${job.name}で対応する作業と、対応しない作業を明確にします。`},
  {title:'必要スキルを1つ補強する',description:`${k}の中から案件獲得に直結するスキルを選び、実務で使えるレベルまで練習します。`},
  {title:'実績サンプルを作る',description:'依頼前でも仕事内容が伝わる成果物を1〜3点用意します。'},
  {title:'サービス内容と料金を決める',description:'作業範囲、納期、修正回数、料金を決めます。'},
  {title:'案件を探す場所を決める',description:'仕事と相性の良い獲得経路を1〜2個選びます。'},
  {title:'最初の案件に応募・出品する',description:'条件の合う小規模案件から最初の実績獲得を目指します。'}],job);
 if(job.revenueModel==='月額継続')return steps([
  {title:'継続して支援する相手を決める',description:`${job.name}を毎月必要とする顧客像と課題を明確にします。`},
  {title:'月額サービスの範囲を決める',description:'毎月行う作業、回数、納品物、連絡方法を定型化します。'},
  {title:'作業テンプレートを準備する',description:'繰り返し作業を効率化するチェックリストや報告フォーマットを作ります。'},
  {title:'お試しプランを作る',description:'継続契約前に価値を体験できる小さなプランを用意します。'},
  {title:'見込み顧客に提案する',description:'課題が合う相手にサービス内容を伝えます。'},
  {title:'最初の継続契約を作る',description:'初回支援の結果と翌月の改善案を提示して継続につなげます。'}],job);
 if(job.revenueModel==='広告・アフィリエイト'||job.revenueModel==='成果報酬')return steps([
  {title:'発信テーマと対象者を決める',description:`${k}の経験を軸に、誰に何を届ける発信かを明確にします。`},
  {title:'収益につながるテーマを調べる',description:'読者の悩みと紹介できる商品・サービスが自然につながるテーマを選びます。'},
  {title:'発信媒体を1つに絞る',description:'自分が継続しやすく対象者に届きやすい媒体を選びます。'},
  {title:'役立つコンテンツを作る',description:'体験談、比較、使い方、失敗例など経験が価値になる内容を公開します。'},
  {title:'収益導線を設置する',description:'内容に合う案件を選び、読者の判断を助ける形で紹介します。'},
  {title:'アクセスを増やす',description:'検索やSNSから継続的に見てもらえるよう改善と新規発信を続けます。'}],job);
 return steps([
  {title:'仕事内容を具体化する',description:`${job.name}で実際に提供する価値と対象者を明確にします。`},
  {title:'必要スキルを確認する',description:`${k}を中心に開始前に必要なスキルを確認します。`},
  {title:'最小限の準備をする',description:'必要な道具や環境だけを揃えます。'},
  {title:'小さく試してみる',description:'最小単位で仕事を試し、作業時間や難しさを確認します。'},
  {title:'価格と提供方法を決める',description:'収益モデルに合わせて料金と提供方法を決めます。'},
  {title:'最初の顧客を探す',description:'仕事内容に合う場所で募集・販売・提案を開始します。'}],job);
}