import {Head,Link,router,usePage} from '@inertiajs/react';
import {useEffect,useRef,useState} from 'react';
import Layout from './Layout';

export default function CrudIndex({kind,items}){
 const projects=kind==='projects';const singular=projects?'project':'tool';const base=`/crud${kind}`;
 const {flash}=usePage().props;
 const [search,setSearch]=useState('');const [pending,setPending]=useState(null);const [deleting,setDeleting]=useState(false);
 const dialog=useRef(null);const trigger=useRef(null);
 useEffect(()=>{if(pending)dialog.current.showModal();else{dialog.current?.close();trigger.current?.focus()}},[pending]);
 const name=item=>projects?item.title:item.name;
 const filtered=items.filter(item=>`${name(item)} ${item.category}`.toLowerCase().includes(search.toLowerCase()));
 function destroy(){router.delete(`${base}/${pending.id}`,{onStart:()=>setDeleting(true),onSuccess:()=>setPending(null),onFinish:()=>setDeleting(false)})}
 return <Layout><Head title={projects?'Manage projects':'Manage tech stack'}/><main id="main" className="management-page mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-16">
  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Portfolio studio</p>
  <nav className="management-tabs mt-5 flex gap-2 border-b border-line pb-5" aria-label="Management sections">
   {[['projects','Projects'],['tools','Tools & stack']].map(([key,label])=><Link key={key} href={`/crud${key}`} aria-current={key===kind?'page':undefined} className={'flex min-h-11 items-center justify-center gap-3 rounded-full border px-5 text-sm font-medium '+(kind===key?'border-ink bg-ink text-page':'border-line hover:bg-surface')}>{label}{key===kind&&<span className="text-xs opacity-70">{String(items.length).padStart(2,'0')}</span>}</Link>)}
  </nav>
  <div className="management-heading mt-7 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">{projects?'Make your work visible':'The tools behind your work'}</p><h1 className="mt-2 text-4xl font-bold tracking-tight">{projects?'Your projects':'Your tech stack'}</h1></div><Link href={`${base}/create`} className="create-button inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 font-bold text-on-primary"><span aria-hidden="true" className="text-xl font-normal">+</span>Add {singular}</Link></div>
  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{projects?'Keep your latest work up to date. Changes appear on your portfolio and homepage.':'Build your stack. Changes appear in Tools I use and on your About page.'}</p>
  {flash.success&&<p role="status" className="mt-6 rounded-xl border border-primary bg-surface p-4 text-sm">{flash.success}</p>}
  <div className="mt-7 flex items-end justify-between gap-4"><label className="block w-full max-w-sm text-xs font-bold uppercase tracking-widest">Search {kind}<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Find a ${singular}…`} className="mt-2 h-12 w-full rounded-xl border border-line bg-page px-4 text-base font-normal normal-case tracking-normal outline-primary"/></label><span className="mb-4 shrink-0 text-xs text-muted">{filtered.length} {filtered.length===1?'result':'results'}</span></div>
  <ul className={'record-list mt-6 divide-y divide-line border-y border-line '+(projects?'project-records':'tool-records')}>
   {filtered.map(item=><li key={item.id} className="record-card flex flex-wrap items-center justify-between gap-4 py-5">
    <div className="record-content flex min-w-0 flex-1 items-center gap-4">{(projects?item.image:item.icon)?<img src={projects?item.image:item.icon} alt="" className={'record-image shrink-0 rounded-lg border border-line bg-surface '+(projects?'h-16 w-24 object-cover':'size-12 object-contain p-2')}/>:<span className="record-placeholder grid size-12 shrink-0 place-items-center rounded-lg border border-line text-primary" aria-hidden="true">{projects?'↗':'⌘'}</span>}
     <div className="min-w-0"><p className="mb-1 text-xs text-muted">{item.category}</p><h2 className="text-lg font-bold leading-snug">{name(item)}</h2><p className="mt-1 text-xs text-muted">{projects?item.completed_year:`${item.proficiency}% proficiency`}<span className="mx-2 opacity-50">/</span>Order {item.display_order}</p></div>
    </div>
    <div className="record-actions flex gap-2"><Link href={`${base}/${item.id}/edit`} className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-medium hover:bg-surface">Edit<span className="sr-only"> {name(item)}</span></Link><button onClick={e=>{trigger.current=e.currentTarget;setPending(item)}} className="min-h-11 rounded-full border border-line px-5 text-sm font-medium text-primary hover:bg-surface">Delete<span className="sr-only"> {name(item)}</span></button></div>
   </li>)}
  </ul>
  {!filtered.length&&<div className="my-6 rounded-2xl border border-dashed border-line px-6 py-12 text-center"><h2 className="text-lg font-bold">{items.length?'No matching '+kind:'A fresh start'}</h2><p className="mt-2 text-sm text-muted">{items.length?'Try another name or category.':`Add your first ${singular} to bring this section to life.`}</p>{search&&<button onClick={()=>setSearch('')} className="mt-4 min-h-11 px-4 text-sm underline">Clear search</button>}</div>}
  <Link href={projects?'/work':'/about'} className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-medium">View public {projects?'projects':'tech stack'} <span aria-hidden="true">↗</span></Link>
  <dialog ref={dialog} onCancel={e=>{if(deleting)e.preventDefault();else setPending(null)}} aria-labelledby="delete-heading" className="delete-dialog m-auto w-full max-w-md border border-line bg-page p-8 text-ink backdrop:bg-black/60"><p className="text-xs font-bold uppercase tracking-widest text-primary">Confirm deletion</p><h2 id="delete-heading" className="mt-3 break-words text-2xl font-bold">Delete {pending&&name(pending)}?</h2><p className="mt-4 text-sm leading-relaxed text-muted">This removes the {singular} from your public portfolio.</p><div className="mt-8 flex gap-3"><button disabled={deleting} onClick={destroy} className="min-h-12 rounded-full bg-primary px-5 py-3 font-medium text-on-primary disabled:opacity-50">{deleting?'Deleting…':`Delete ${singular}`}</button><button disabled={deleting} onClick={()=>setPending(null)} className="min-h-12 rounded-full border border-line px-5">Cancel</button></div></dialog>
 </main></Layout>;
}
