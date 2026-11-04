/**
 * The site comes in three looks. Each visitor draws one on their first visit and
 * keeps it, and `?look=` picks one for a link (`?look=base` shows the original).
 * A look is a `data-look` value on <html>: tokens and type live in app/looks.css,
 * and look-specific art is always rendered and shown with the `only-*` classes,
 * so switching needs no re-render.
 */
export const looks = [
  { id: 'tsuki', mark: '月', label: 'Tsuki', meaning: 'Moon', odds: 0.5, bar: '#070506' },
  { id: 'sumi', mark: '墨', label: 'Sumi', meaning: 'Ink', odds: 0.3, bar: '#efe8da' },
  { id: 'kiwami', mark: '極', label: 'Kiwami', meaning: 'The utmost', odds: 0.2, bar: '#a19e99' },
] as const;

export type Look = (typeof looks)[number]['id'];

export const lookKey = 'look';

/** Colours the browser's own bars to match, where it supports that. */
export const setBar = (color: string) => {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.append(meta);
  }
  meta.content = color;
};

/** Runs before paint, so visitors never see another look flash first. */
export const lookBoot = `(function(){
var ids=${JSON.stringify(looks.map((look) => look.id))},odds=${JSON.stringify(looks.map((look) => look.odds))},bars=${JSON.stringify(looks.map((look) => look.bar))},root=document.documentElement,look,saved;
if(location.pathname.indexOf('/studio')===0)return;
try{look=new URLSearchParams(location.search).get('look')}catch(e){}
if(look==='base'){root.dataset.look=look;return}
try{saved=localStorage.getItem('${lookKey}')}catch(e){}
if(ids.indexOf(look)<0)look=saved;
if(ids.indexOf(look)<0){var r=Math.random(),i=0;while(i<ids.length-1&&(r-=odds[i])>=0)i++;look=ids[i]}
if(look!==saved)try{localStorage.setItem('${lookKey}',look)}catch(e){}
root.dataset.look=look;
var meta=document.createElement('meta');meta.name='theme-color';meta.content=bars[ids.indexOf(look)];document.head.append(meta)})()`;
