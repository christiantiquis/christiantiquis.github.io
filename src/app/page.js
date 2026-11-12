import Image from "next/image";
import Particles from "./components/Particles/Particles";

const dayToDay = ["TypeScript", "React", "Next.js", "Java", "Spring Boot", "Python"];

const projects = [
  {
    kicker: "BST / BROWSER TOOLKIT",
    title: "Everyday utilities. Nothing leaves the browser.",
    body: "Search tools for text, code, JSON, and design. This site routes /tools/ to a separate Cloudflare Worker, and every tool processes data on the device.",
    tools: ["TypeScript", "Next.js", "React"],
    href: "/tools/",
    cta: "Open BST Tools",
    image: "/work/bst-tools.png",
    alt: "BST Tools, a directory of browser utilities for text, JSON, and code",
  },
  {
    kicker: "TODOLIZT",
    title: "A task list that survives a second tab.",
    body: "Tasks stay in the browser. A backup can be previewed before it is imported, Trash keeps deleted tasks for 30 days, and a stale tab cannot overwrite a newer edit.",
    tools: ["TypeScript", "Next.js", "React"],
    href: "https://christiantiquis.github.io/todo-list-react/",
    source: "https://github.com/christiantiquis/todo-list-react",
    cta: "Open TodoLizt",
    image: "/work/todolizt.png",
    alt: "TodoLizt, a daily task list saved in the browser",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="brand-header">
        <a className="brand-home" href="#" aria-label="Chris — BST home">
          <Image className="brand-logo-image" src="/BST.jpg" alt="BST" width={999} height={1009} unoptimized />
        </a>
        <nav className="brand-nav" aria-label="Main navigation">
          <a href="#about">About</a><a href="#stack">Stack</a><a href="#work">Work</a><a href="/tools/">Tools</a>
          <a className="brand-contact" href="#contact">Let&apos;s connect <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <main id="main">
        <div className="hero-stage">
          <Particles />
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Open to remote opportunities</p>
            <h1 id="hero-title">Hello, I&apos;m <span className="hero-name">Chris.</span><br /><span>I build for<br className="desktop-break" /> the web.</span></h1>
            <p className="hero-description">Software engineer building small web tools with TypeScript and React. I prefer software that stays on your machine when it can.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">See selected work</a><a className="text-link" href="https://www.linkedin.com/in/christiantiquis/">Connect on LinkedIn <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="code-window">
              <div className="window-bar"><span /><span /><span /><span className="window-label">a little about me</span></div>
              <pre><code><span className="code-muted">{"// Small tools. On your machine."}</span>{'\n\n'}<span className="code-purple">const</span> developer = {'{\n'}{'  '}name: <span className="code-green">&quot;Chris Tiquis&quot;</span>,{'\n'}{'  '}focus: <span className="code-green">&quot;Web tools&quot;</span>,{'\n'}{'  '}prefers: <span className="code-green">&quot;Local-first when it can&quot;</span>,{'\n'}{'};'}</code></pre>
              <div className="window-footer"><span className="status-dot" /> Learning never stops.</div>
            </div>
            <span className="visual-caption">SMALL TOOLS / ON YOUR MACHINE</span>
          </div>
          <a className="scroll-cue" href="#about"><span aria-hidden="true">↓</span> A little more about me</a>
        </section>
        </div>
        <section className="about-section section container" id="about" aria-labelledby="about-title">
          <div><p className="eyebrow">01 / About</p><h2 id="about-title">Small tools,<br />used for real.</h2></div>
          <div className="about-copy">
            <p>I&apos;m Christian Tiquis. I build utilities I actually open, and I prefer work that stays on your machine when it can.</p>
            <p className="now"><span className="now-label">Now</span> Extending BST Tools, and keeping TodoLizt in daily use.</p>
            <p className="availability">Currently open to remote full-stack developer opportunities.</p>
          </div>
        </section>
        <section className="section stack-section container" id="stack" aria-labelledby="stack-title">
          <div className="section-heading">
            <div><p className="eyebrow">02 / Toolkit</p><h2 id="stack-title">Day to day.</h2></div>
            <p>TypeScript, React, and Next.js for the work below. Java and Spring Boot when the work is on the server. Python for small scripts.</p>
          </div>
          <ul className="tags stack-tags">{dayToDay.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </section>
        <section className="section work-section container" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div><p className="eyebrow">03 / Selected work</p><h2 id="work-title">Two things I ship and use.</h2></div>
          </div>
          <div className="work-list">
            {projects.map((project) => (
              <article className="work-panel" key={project.kicker}>
                <div>
                  <span className="small-label">{project.kicker}</span>
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                  <ul className="tags">{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
                  <div className="work-actions">
                    <a className="button button-primary" href={project.href}>{project.cta} <span aria-hidden="true">↗</span></a>
                    {project.source ? <a className="text-link" href={project.source}>Source <span aria-hidden="true">↗</span></a> : null}
                  </div>
                </div>
                <figure className="work-shot">
                  <Image src={project.image} alt={project.alt} width={1440} height={900} />
                </figure>
              </article>
            ))}
          </div>
        </section>
        <section className="contact-section container" id="contact" aria-labelledby="contact-title"><p className="eyebrow">04 / Get in touch</p><h2 id="contact-title">Let&apos;s build<br /><span>something together.</span></h2><p>Have a full-stack opportunity or want to connect? Email me, or say hello on LinkedIn.</p><div className="hero-actions contact-actions"><a className="button button-primary" href="mailto:christian.tiquis@gmail.com">Email Chris</a><a className="text-link" href="https://www.linkedin.com/in/christiantiquis/">Say hello on LinkedIn <span aria-hidden="true">↗</span></a></div></section>
      </main>
      <footer className="site-footer container"><p>Christian Tiquis <span> / Software Engineer</span></p><div><a href="https://github.com/christiantiquis">GitHub ↗</a><a href="https://www.linkedin.com/in/christiantiquis/">LinkedIn ↗</a><a href="mailto:christian.tiquis@gmail.com">Email</a><a href="#">Back to top ↑</a></div></footer>
    </>
  );
}
