import {useEffect,useRef,useState} from 'react';

export default function ImageUpload({name,label,file,currentImage,onChange,error}) {
 const input=useRef(null);
 const [preview,setPreview]=useState(null);
 useEffect(()=>{
  if(!file){setPreview(null);return;}
  const url=URL.createObjectURL(file);setPreview(url);
  return ()=>URL.revokeObjectURL(url);
 },[file]);
 return <div className="image-upload">
  <label htmlFor={name} className="block text-sm font-bold">{label}</label>
  <p id={`${name}-hint`} className="mt-1 text-sm text-muted">JPG, PNG, WebP or GIF. Maximum 2 MB.</p>
  <input ref={input} id={name} name={name} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" tabIndex={-1} onChange={e=>onChange(e.target.files?.[0]??null)} aria-invalid={!!error} aria-describedby={`${name}-hint${error?' '+name+'-error':''}`}/>
  <div className="mt-3 flex flex-wrap items-center gap-4">
   <button type="button" onClick={()=>input.current.click()} aria-describedby={`${name}-hint`} className="border border-line bg-surface px-5 py-3 font-medium hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">Choose image</button>
   <span className="break-all text-sm text-muted">{file?.name??(currentImage?'Current image retained':'No image selected')}</span>
   {file&&<button type="button" className="text-sm underline" onClick={()=>{input.current.value='';onChange(null)}}>Cancel selection</button>}
  </div>
  {(preview||currentImage)&&<img src={preview||currentImage} alt={`${label} preview`} className="mt-4 max-h-48 max-w-full rounded border border-line object-contain"/>}
  {error&&<p id={`${name}-error`} role="alert" className="mt-2 text-sm text-primary">{error}</p>}
 </div>;
}
