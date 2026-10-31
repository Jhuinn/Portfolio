import {Fragment,useEffect,useState} from 'react';

const phrases=['I build.','I enhance.','I solve.'];

export default function TypedHeading(){
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [lines,setLines]=useState(()=>reduced?phrases:['','','']);
 const [activeLine,setActiveLine]=useState(0);

 useEffect(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>setReduced(preference.matches);
  preference.addEventListener('change',update);
  return ()=>preference.removeEventListener('change',update);
 },[]);

 useEffect(()=>{
  if(reduced){setLines(phrases);return;}
  let timer;
  let index=0, character=0;
  const visible=['','',''];
  setLines([...visible]);setActiveLine(0);
  function render(){visible[index]=phrases[index].slice(0,character);setLines([...visible]);setActiveLine(index);}
  function type(){
   character++;render();
   if(character<phrases[index].length)timer=setTimeout(type,70);
   else if(index<phrases.length-1){index++;character=0;timer=setTimeout(type,400);}
   else timer=setTimeout(erase,2500);
  }
  function erase(){
   character--;render();
   if(character>0)timer=setTimeout(erase,35);
   else if(index>0){index--;character=phrases[index].length;timer=setTimeout(erase,150);}
   else timer=setTimeout(type,600);
  }
  timer=setTimeout(type,300);
  return ()=>clearTimeout(timer);
 },[reduced]);

 return <>
  <span className="sr-only">I build. I enhance. I solve.</span>
  <span className="grid" aria-hidden="true">
   {/* Reserve the complete heading size throughout the loop. */}
   <span className="invisible pr-[0.2em] [grid-area:1/1]">I build.<br/>I enhance.<br/>I solve.</span>
   <span id="typed-heading" className="[grid-area:1/1]">
    {lines.map((text,index)=><Fragment key={index}><span className={'relative inline-block '+(index===2?'text-primary':'')}><span data-line="true">{text}</span>{!reduced&&index===activeLine&&<span id="typed-cursor" className="absolute left-full top-[0.1em] ml-1 h-[0.8em] w-[0.08em] bg-primary animate-blink"/>}</span>{index<phrases.length-1&&<br/>}</Fragment>)}
   </span>
  </span>
 </>;
}
