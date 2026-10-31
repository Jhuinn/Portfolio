export default function Footer(){return (<footer className="border-t border-line">
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 grid gap-6 justify-items-center text-center sm:grid-cols-3 sm:items-center">
<a href="/" className="text-lg font-bold tracking-tight sm:justify-self-start">{"JINN"}<span className="text-primary">{"."}</span></a>
<ul className="flex flex-wrap justify-center gap-6 text-sm font-medium uppercase tracking-widest text-muted">
<li ><a href="https://github.com/Jhuinn" target="_blank" rel="noopener noreferrer" className="hover:text-ink">{"GitHub"}<span className="sr-only">{" (opens in a new tab)"}</span></a></li>
<li ><a href="https://www.linkedin.com/in/justin-jay-vitales-9a0448442" target="_blank" rel="noopener noreferrer" className="hover:text-ink">{"LinkedIn"}<span className="sr-only">{" (opens in a new tab)"}</span></a></li>
<li ><a href="mailto:justinjayvitales00@gmail.com" className="hover:text-ink">{"Email"}</a></li>
</ul>
<a href="#top" className="text-sm font-medium uppercase tracking-widest text-muted hover:text-ink sm:justify-self-end">{"\n        Back to top "}<span aria-hidden="true">{"↑"}</span>
</a>
</div>
<p className="px-4 pb-8 text-center text-xs text-muted">{"© 2026 Justin Jay Vitales · Tool logos: "}<a href="https://devicon.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">{"Devicon"}<span className="sr-only">{" (opens in a new tab)"}</span></a>{" (MIT) & "}<a href="https://simpleicons.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">{"Simple Icons"}<span className="sr-only">{" (opens in a new tab)"}</span></a>{" (CC0) & "}<a href="https://heroicons.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">{"Heroicons"}<span className="sr-only">{" (opens in a new tab)"}</span></a>{" (MIT)"}</p>
</footer>);}