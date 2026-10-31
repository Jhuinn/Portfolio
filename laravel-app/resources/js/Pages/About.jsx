import Portrait from '../Components/Portrait';
import {Head} from "@inertiajs/react"; import Layout from "../Components/Layout"; import ToolsSection from "../Components/ToolsSection";
export default function Page({tools=[]}){return <Layout><Head title="Jinn — About"/><main id="main" className="public-page about-page">

<section aria-labelledby="page-heading" className="portrait-section mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
<div className="portrait-copy">
<h1 id="page-heading" className="text-5xl sm:text-6xl font-bold uppercase tracking-tight">{"About me"}</h1>
<p className="mt-8 max-w-xl text-lg text-muted">{"\n          Hey, I'm an aspiring developer on a journey to turn curiosity into code. I love experimenting with new\n          technologies, building creative projects, and finding smarter ways to solve problems. This portfolio is a\n          collection of what I've learned and what I'm building next.\n        "}</p>

<dl className="mt-10 max-w-xl space-y-4 border-t border-line pt-6">
<div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
<dt className="text-sm font-bold uppercase tracking-widest">{"Focus "}<span aria-hidden="true" className="text-primary">{"→"}</span></dt>
<dd className="text-muted">{"Building my skills in development, design, and problem-solving."}</dd>
</div>
<div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
<dt className="text-sm font-bold uppercase tracking-widest">{"Goals "}<span aria-hidden="true" className="text-primary">{"→"}</span></dt>
<dd className="text-muted">{"To grow as a developer, create meaningful projects, and turn ideas into practical digital solutions."}</dd>
</div>
</dl>
</div>
<Portrait/>
</section>

<ToolsSection tools={tools} variant="grid" />

<section aria-labelledby="soft-heading" className="border-t border-line">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
<h2 id="soft-heading" className="text-sm font-bold uppercase tracking-widest">{"Soft skills"}</h2>
<ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
<li className="border-l-2 border-primary pl-4">
<h3 className="font-bold">{"Communication"}</h3>
<p className="mt-1 text-muted">{"Sharing ideas clearly and listening to others to understand different perspectives."}</p>
</li>
<li className="border-l-2 border-primary pl-4">
<h3 className="font-bold">{"Teamwork"}</h3>
<p className="mt-1 text-muted">{"Working well with others to achieve shared goals and complete projects."}</p>
</li>
<li className="border-l-2 border-primary pl-4">
<h3 className="font-bold">{"Problem-Solving"}</h3>
<p className="mt-1 text-muted">{"Analyzing challenges and finding practical solutions."}</p>
</li>
<li className="border-l-2 border-primary pl-4">
<h3 className="font-bold">{"Time Management"}</h3>
<p className="mt-1 text-muted">{"Organizing tasks and meeting deadlines efficiently."}</p>
</li>
<li className="border-l-2 border-primary pl-4">
<h3 className="font-bold">{"Adaptability"}</h3>
<p className="mt-1 text-muted">{"Adjusting to new technologies, challenges, and changing requirements."}</p>
</li>
<li className="border-l-2 border-primary pl-4">
<h3 className="font-bold">{"Willingness to Learn"}</h3>
<p className="mt-1 text-muted">{"Continuously developing new skills and learning from mistakes and feedback."}</p>
</li>
</ul>
</div>
</section>

<section aria-labelledby="edu-heading" className="border-t border-line">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
<h2 id="edu-heading" className="text-sm font-bold uppercase tracking-widest">{"Education"}</h2>

<ol className="mt-8 border-l-2 border-line ml-1.5 space-y-8">
<li className="relative pl-8">
<span className="absolute -left-[9px] top-1.5 size-4 rounded-full bg-primary ring-4 ring-page" aria-hidden="true"></span>
<p className="text-sm font-medium uppercase tracking-widest text-muted">{"2024 – Present · 3rd Year"}</p>
<h3 className="mt-1 text-xl font-bold">{"Bachelor of Science in Information Technology"}</h3>
<p className="mt-1 text-muted">{"Urdaneta City University"}</p>
</li>
<li className="relative pl-8">

<span className="absolute -left-[9px] top-1.5 size-4 rounded-full bg-muted ring-4 ring-page" aria-hidden="true"></span>
<p className="text-sm font-medium uppercase tracking-widest text-muted">{"2017 – 2023"}</p>
<h3 className="mt-1 text-xl font-bold">{"Junior & Senior High School"}</h3>
<p className="mt-1 text-muted">{"Central Institute of Technology"}</p>
</li>
</ol>
</div>
</section>
</main></Layout>}