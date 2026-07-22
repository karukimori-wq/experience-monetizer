export type AffiliateClick={id:number;affiliateKey:string;jobId:string;clickedAt:string};

export const AFFILIATE_CLICK_STORE='experience-monetizer-affiliate-clicks';
const MAX_CLICKS=500;

function isValidClick(value:unknown):value is AffiliateClick{
  if(!value||typeof value!=='object')return false;
  const v=value as Record<string,unknown>;
  return typeof v.id==='number'&&typeof v.affiliateKey==='string'&&typeof v.jobId==='string'&&typeof v.clickedAt==='string';
}

export function getAffiliateClicks():AffiliateClick[]{
  if(typeof window==='undefined')return[];
  try{
    const parsed:unknown=JSON.parse(localStorage.getItem(AFFILIATE_CLICK_STORE)||'[]');
    if(!Array.isArray(parsed))return[];
    return parsed.filter(isValidClick).slice(0,MAX_CLICKS);
  }catch{return[]}
}

export function trackAffiliateClick(affiliateKey:string,jobId:string){
  if(typeof window==='undefined'||!affiliateKey||!jobId)return;
  try{
    const current=getAffiliateClicks();
    const click:AffiliateClick={id:Date.now(),affiliateKey,jobId,clickedAt:new Date().toISOString()};
    localStorage.setItem(AFFILIATE_CLICK_STORE,JSON.stringify([click,...current].slice(0,MAX_CLICKS)));
  }catch{}
}

export function clearAffiliateClicks(){
  if(typeof window==='undefined')return;
  try{localStorage.removeItem(AFFILIATE_CLICK_STORE)}catch{}
}
