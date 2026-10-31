export default function ProjectCard({project,index=0,preview=false,compact=false}){
 const Heading=preview?'h3':'h2';
 return <article id={preview?undefined:project.slug} className={'project-card group relative '+(!compact?'grid gap-8 md:grid-cols-2 md:items-center':'')}>
 <div className="relative"><div className="project-image-outline absolute inset-0 border-2 border-accent" aria-hidden="true"/>{project.image?<img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="relative aspect-video w-full object-cover bg-surface"/>:<div className="relative aspect-video grid place-items-center bg-surface text-muted">{project.title}</div>}</div>
 <div className={compact?'mt-6':''}><p className="text-sm font-medium uppercase tracking-widest text-muted"><span className="text-primary">{String(index+1).padStart(2,'0')}</span> · {project.completed_year} · {project.category}</p>
 <Heading className="mt-3 text-3xl sm:text-4xl font-bold uppercase tracking-tight">{preview?<a href={`/work#${project.slug}`} className="after:absolute after:inset-0 group-hover:text-primary">{project.title}</a>:project.title}</Heading>
 {!compact&&<><p className="mt-2 font-medium">Role: {project.role}</p><p className="mt-4 text-muted whitespace-pre-line">{project.description}</p></>}
 <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">{project.tech_stack.split(',').map((tech,i)=><li key={i} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium">{tech.trim()}</li>)}</ul>
 {!preview&&<div className="mt-6 flex flex-wrap gap-6">{project.project_url&&<a href={project.project_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Visit project ↗</a>}{project.repository_url&&<a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Source code ↗</a>}</div>}
 </div></article>
}
