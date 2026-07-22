export type LearningResource={skill:string;title:string;description:string;kind:'講座'|'書籍'|'ツール'|'サービス';cta:string;affiliateKey:string};

export const learningResources:LearningResource[]=[
{skill:'Excel',title:'Excel実務スキル講座',description:'関数・ピボット・Power Queryなど、副業でそのまま使いやすい実務スキルを補強します。',kind:'講座',cta:'学習候補を見る',affiliateKey:'excel-course'},
{skill:'文章作成',title:'Webライティング基礎講座',description:'構成、見出し、リサーチ、推敲まで、案件獲得に必要な文章作成の基本を学びます。',kind:'講座',cta:'学習候補を見る',affiliateKey:'writing-course'},
{skill:'SEO・集客',title:'SEO・ブログ集客入門',description:'検索意図、キーワード選定、記事設計など、継続的な集客につながる基礎を学びます。',kind:'講座',cta:'学習候補を見る',affiliateKey:'seo-course'},
{skill:'SNS運用',title:'SNS運用・投稿設計講座',description:'投稿企画、運用カレンダー、分析改善など、SNS運用代行にも使える型を身につけます。',kind:'講座',cta:'学習候補を見る',affiliateKey:'sns-course'},
{skill:'デザイン',title:'Canva・デザイン基礎',description:'レイアウト、配色、文字組みなど、バナーやSNS画像制作の基礎を学びます。',kind:'講座',cta:'学習候補を見る',affiliateKey:'design-course'},
{skill:'動画編集',title:'動画編集スターター講座',description:'カット、テロップ、音量調整、書き出しまで、受託に必要な一連の作業を学びます。',kind:'講座',cta:'学習候補を見る',affiliateKey:'video-course'},
{skill:'教える力',title:'オンライン講師スタートガイド',description:'説明の組み立て、教材準備、オンラインでの進行方法を学びます。',kind:'書籍',cta:'参考教材を見る',affiliateKey:'teaching-book'},
{skill:'問題解決',title:'業務改善・問題解決の基本',description:'課題整理、原因分析、改善案の設計など、経験をサービス化するための型を身につけます。',kind:'書籍',cta:'参考教材を見る',affiliateKey:'problem-solving-book'},
{skill:'情報整理',title:'情報整理・タスク管理ツール',description:'案件管理やテンプレート設計にも使える整理環境を整えます。',kind:'ツール',cta:'ツール候補を見る',affiliateKey:'productivity-tool'},
{skill:'ツール活用',title:'副業向けオンラインツール',description:'制作、共有、顧客対応などを効率化する基本ツールを確認します。',kind:'ツール',cta:'ツール候補を見る',affiliateKey:'online-tools'},
{skill:'顧客対応',title:'フリーランス案件獲得サービス',description:'小規模案件から実績を作りやすい案件獲得サービスを比較します。',kind:'サービス',cta:'サービス候補を見る',affiliateKey:'freelance-market'},
{skill:'販売力',title:'デジタル商品販売サービス',description:'テンプレートやコンテンツを販売できるサービスと手数料の違いを比較します。',kind:'サービス',cta:'販売先候補を見る',affiliateKey:'digital-market'},
{skill:'継続運用',title:'SNS・業務管理ツール',description:'継続案件の投稿・タスク・進捗を管理しやすいツールを確認します。',kind:'ツール',cta:'ツール候補を見る',affiliateKey:'management-tool'},
{skill:'リサーチ',title:'リサーチ効率化ツール',description:'情報収集と整理を効率化し、記事作成や商品企画の時間を短縮します。',kind:'ツール',cta:'ツール候補を見る',affiliateKey:'research-tool'}
];

export function getLearningResources(skills:string[]){const selected:LearningResource[]=[];for(const skill of skills){const exact=learningResources.find(r=>r.skill===skill);if(exact&&!selected.some(r=>r.affiliateKey===exact.affiliateKey))selected.push(exact)}if(!selected.length)selected.push(learningResources[9],learningResources[10]);return selected.slice(0,3)}