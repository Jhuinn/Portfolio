import {useEffect,useRef,useState} from 'react';
import {flushSync} from 'react-dom';

export default function useThemeWave(){
 const [dark,setDark]=useState(()=>document.documentElement.classList.contains('dark'));
 const active=useRef(null);
 const busy=useRef(false);
 useEffect(()=>()=>{active.current?.animation?.cancel();active.current?.transition?.skipTransition()},[]);

 async function toggleTheme(event){
  if(busy.current)return;
  const root=document.documentElement;
  const next=!root.classList.contains('dark');
  function apply(){
   flushSync(()=>setDark(next));
   root.classList.toggle('dark',next);
   try{localStorage.setItem('theme',next?'dark':'light')}catch{}
  }
  if(!document.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches){apply();return;}
  const rect=event.currentTarget.getBoundingClientRect();
  const x=rect.left+rect.width/2, y=rect.top+rect.height/2;
  const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  busy.current=true;
  root.classList.add('theme-wave');
  try{
   const transition=document.startViewTransition(apply);
   active.current={transition};
   await transition.ready;
   const animation=root.animate(
    {clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},
    {duration:700,easing:'cubic-bezier(0.22, 1, 0.36, 1)',pseudoElement:'::view-transition-new(root)',fill:'forwards'}
   );
   active.current.animation=animation;
   await animation.finished;
   // Release the snapshot so scrolling and page interactions resume normally.
   animation.cancel();
   await transition.finished;
  }catch{
   active.current?.transition?.skipTransition();
   apply();
  }finally{
   root.classList.remove('theme-wave');active.current=null;busy.current=false;
  }
 }
 return {dark,toggleTheme};
}
