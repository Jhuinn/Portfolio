import Portrait from '../Components/Portrait';
import TypedHeading from '../Components/TypedHeading';
import ProjectCard from '../Components/ProjectCard';
import {Head} from "@inertiajs/react"; import Layout from "../Components/Layout"; import ToolsSection from "../Components/ToolsSection";
export default function Page({tools=[],projects=[]}){return <Layout><Head title="Jinn — Index"/><main id="main" className="public-page portfolio-page">

<section aria-labelledby="hero-heading" className="portrait-section mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
<div className="portrait-copy">
<p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted">{"\n          Available for opportunities\n          "}<span className="size-2 rounded-full bg-primary animate-pulse motion-reduce:animate-none" aria-hidden="true"></span>
</p>

<div className="mt-6 flex items-center justify-between gap-4">
<h1 id="hero-heading" className="text-[clamp(2rem,calc(18vw_-_1.5rem),3rem)] sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight">

<TypedHeading/>
</h1>

</div>
<p className="mt-8 max-w-md text-lg text-muted">
<span className="font-medium text-ink">{"Justin Jay Vitales"}</span>{" — BSIT student & full-stack developer.\n          I build with AI to deliver enhancements and solve real problems.\n        "}</p>
<div className="mt-8 border-t border-line pt-4 max-w-md">
<p className="text-sm uppercase tracking-widest text-muted">{"Laravel • Flutter • Supabase • Tailwind"}</p>
</div>
<div className="mt-10 flex flex-wrap gap-4">
<a href="/work" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-on-primary hover:bg-primary-dark">{"\n            View my work "}<span aria-hidden="true">{"→"}</span>
</a>
<a href="/contact" className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium uppercase tracking-widest hover:bg-ink hover:text-page">{"\n            Get in touch\n          "}</a>
</div>
</div>


<Portrait/>
</section>




<ToolsSection tools={tools} variant="strip" />

<section aria-labelledby="work-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24"><h2 id="work-heading" className="text-sm font-bold uppercase tracking-widest">Selected work</h2><div className="mt-8">{projects[0]&&<ProjectCard project={projects[0]} preview/>}</div><div className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-8">{projects.slice(1).map((project,i)=><ProjectCard key={project.id} project={project} index={i+1} preview compact/>)}</div>{!projects.length&&<p className="mt-8 text-muted">New projects are on the way.</p>}<div className="mt-12 text-right"><a href="/work" className="text-sm font-bold uppercase tracking-widest hover:text-primary">All projects →</a></div></div></section>
<section id="about" aria-labelledby="about-heading" className="border-b border-line">
 <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
  <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
   <div>
    <h2 id="about-heading" className="text-sm font-bold uppercase tracking-widest">About me</h2>
    <p className="mt-4 max-w-xs text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Turning curiosity <span className="text-primary">into code.</span></p>
   </div>
   <div>
    <p className="max-w-2xl text-lg leading-relaxed text-muted">Hey, I’m Justin Jay Vitales, a BSIT student and aspiring developer. I love experimenting with new technologies, building creative projects, and finding smarter ways to solve problems. This portfolio is a collection of what I’ve learned and what I’m building next.</p>
    <dl className="mt-7 grid gap-5 sm:grid-cols-2">
     <div className="border-l-2 border-primary pl-4"><dt className="text-xs font-bold uppercase tracking-widest">My focus</dt><dd className="mt-2 text-sm leading-relaxed text-muted">Building my skills in development, design, and problem-solving.</dd></div>
     <div className="border-l-2 border-primary pl-4"><dt className="text-xs font-bold uppercase tracking-widest">My goal</dt><dd className="mt-2 text-sm leading-relaxed text-muted">To grow as a developer and turn ideas into practical digital solutions.</dd></div>
    </dl>
    <a href="/about" className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-bold hover:text-primary">More about me <span aria-hidden="true">↗</span></a>
   </div>
  </div>
 </div>
</section>
</main></Layout>}
