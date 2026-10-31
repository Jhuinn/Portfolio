import {Head} from "@inertiajs/react"; import Layout from "../Components/Layout"; import ToolsSection from "../Components/ToolsSection";
export default function Page({tools=[]}){function submitContact(event){event.preventDefault(); const form=event.currentTarget; if(!form.reportValidity())return; const message=form.querySelector("textarea").value; const result=document.querySelector("#form-success"); result.textContent=message.trim().length<20 ? "Please write at least 20 characters." : "This contact form is a demo. Email justinjayvitales00@gmail.com to get in touch."; result.classList.remove("hidden");}return <Layout><Head title="Jinn — Contact"/><main id="main" className="public-page contact-page">
<section aria-labelledby="page-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
<h1 id="page-heading" className="text-5xl sm:text-6xl font-bold uppercase tracking-tight">{"Let's build something."}</h1>
<p className="mt-6 max-w-xl text-lg text-muted">{"Got a project, an opportunity, or a question? Send me a message or email me directly."}</p>
<div className="mt-12 grid gap-16 lg:grid-cols-[3fr_2fr]">

<form onSubmit={submitContact} id="contact-form" noValidate={true} aria-describedby="form-note" className="space-y-6" data-demo="true">
<p id="form-note" className="text-sm text-muted">{"All fields are required."}</p>
<div >
<label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest">{"Name"}</label>
<input id="name" name="name" type="text" autoComplete="name" required={true} aria-describedby="name-error" className="mt-2 w-full border border-muted bg-transparent px-4 py-3 text-ink focus:outline-2 focus:outline-offset-2 focus:outline-primary aria-[invalid=true]:border-primary" />
<p id="name-error" className="mt-2 text-sm text-primary"></p>
</div>
<div >
<label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest">{"Email"}</label>
<input id="email" name="email" type="email" autoComplete="email" required={true} aria-describedby="email-error" className="mt-2 w-full border border-muted bg-transparent px-4 py-3 text-ink focus:outline-2 focus:outline-offset-2 focus:outline-primary aria-[invalid=true]:border-primary" />
<p id="email-error" className="mt-2 text-sm text-primary"></p>
</div>
<div >
<label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest">{"Message"}</label>
<textarea id="message" name="message" rows="6" required={true} aria-describedby="message-error" className="mt-2 w-full border border-muted bg-transparent px-4 py-3 text-ink focus:outline-2 focus:outline-offset-2 focus:outline-primary aria-[invalid=true]:border-primary resize-y"></textarea>
<p id="message-error" className="mt-2 text-sm text-primary"></p>
</div>
<button type="submit" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-on-primary hover:bg-primary-dark">{"\n            Send message "}<span aria-hidden="true">{"→"}</span>
</button>

<div role="status">
<p id="form-success" className="hidden border-l-4 border-primary bg-surface p-4"></p>
</div>
</form>
<aside aria-labelledby="find-heading">
<h2 id="find-heading" className="text-sm font-bold uppercase tracking-widest">{"Find me"}</h2>
<ul className="mt-6 space-y-6">
<li >
<p className="text-sm font-medium uppercase tracking-widest text-muted">{"Email"}</p>
<a href="mailto:justinjayvitales00@gmail.com" className="mt-1 inline-block break-all text-lg font-medium hover:text-primary">{"justinjayvitales00@gmail.com"}</a>
</li>
<li >
<p className="text-sm font-medium uppercase tracking-widest text-muted">{"GitHub"}</p>
<a href="https://github.com/Jhuinn" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-lg font-medium hover:text-primary">{"github.com/Jhuinn"}<span className="sr-only">{" (opens in a new tab)"}</span></a>
</li>
<li >
<p className="text-sm font-medium uppercase tracking-widest text-muted">{"LinkedIn"}</p>
<a href="https://www.linkedin.com/in/justin-jay-vitales-9a0448442" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block break-all text-lg font-medium hover:text-primary">{"linkedin.com/in/justin-jay-vitales-9a0448442"}<span className="sr-only">{" (opens in a new tab)"}</span></a>
</li>
<li >
<p className="text-sm font-medium uppercase tracking-widest text-muted">{"Discord"}</p>

<p className="mt-1 text-lg font-medium">{"dzeixu"}</p>
</li>
</ul>
</aside>
</div>
</section>
</main></Layout>}