export type AffiliateClick={id:number;affiliateKey:string;jobId:string;clickedAt:string};

const STORE='experience-monetizer-affiliate-clicks';

export function trackAffiliateClick(affiliateKey:string,jobId:string){
  if(typeof window==='undefined')return;
  try{
    const current:AffiliateClick[]=JSON.parse(localStorage.getItem(STORE)||'[]');
    const next=[{id:Date.now(),affiliateKey,jobId,clickedAt:new Date().toISOString()},...current].slice(0,500);
    localStorage.setItem(STORE,JSON.stringify(next));
  }catch{}
}

export function getAffiliateClicks():AffiliateClick[]{
  if(typeof window==='undefined')return[];
  try{return JSON.parse(localStorage.getItem(STORE)||'[]')}catch{return[]}
}
