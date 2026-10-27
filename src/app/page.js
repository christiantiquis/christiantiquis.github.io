import Image from "next/image";
import Particles from "./components/Particles/Particles";

const skills = [
  { number: '01', title: 'Frontend', description: 'Interfaces for the web.', tools: ['TypeScript', 'JavaScript', 'React', 'Angular', 'HTML & CSS', 'Tailwind CSS', 'MUI'] },
  { number: '02', title: 'Backend', description: 'The systems behind the screen.', tools: ['Java', 'Spring Boot', 'Spring MVC', 'Node.js', 'Express', 'REST APIs'] },
  { number: '03', title: 'Data & delivery', description: 'From development to deployment.', tools: ['PostgreSQL', 'MySQL', 'JUnit', 'Mockito', 'Postman', 'Git', 'Jenkins', 'Azure'] },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header container">
        <a className="wordmark" href="#" aria-label="Chris — BST home">
          <Image className="brand-logo" src="/BST.jpg" alt="BST" width={999} height={1009} unoptimized />
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a><a href="#stack">Stack</a><a href="#work">Work</a><a href="/tools/">Tools</a>
          <a className="nav-contact" href="#contact">Let&apos;s connect <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <main id="main">
        <div className="hero-stage">
          <Particles />
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Open to remote opportunities</p>
            <h1 id="hero-title">Hello, I&apos;m <span className="hero-name">Chris.</span><br /><span>I build for<br className="desktop-break" /> the web.</span></h1>
            <p className="hero-description">Software engineer & full-stack developer working across TypeScript, React, Java, and Spring Boot.</p>
            <div className="hero-actions"><a className="button button-primary" href="https://www.linkedin.com/in/christiantiquis/">Connect on LinkedIn <span aria-hidden="true">↗</span></a><a className="text-link" href="https://github.com/christiantiquis">Explore my GitHub <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="code-window">
              <div className="window-bar"><span /><span /><span /><span className="window-label">a little about me</span></div>
              <pre><code><span className="code-muted">{"// Always curious. Always building."}</span>{'\n\n'}<span className="code-purple">const</span> developer = {'{\n'}{'  '}name: <span className="code-green">&quot;Chris Tiquis&quot;</span>,{'\n'}{'  '}focus: <span className="code-green">&quot;Full-stack development&quot;</span>,{'\n'}{'  '}interests: [{'\n'}{'    '}<span className="code-green">&quot;AI & machine learning&quot;</span>,{'\n'}{'    '}<span className="code-green">&quot;Automation&quot;</span>{'\n'}{'  '}],{'\n'}{'};'}</code></pre>
              <div className="window-footer"><span className="status-dot" /> Learning never stops.</div>
            </div>
            <span className="visual-caption">FRONTEND / BACKEND / EVERYTHING BETWEEN</span>
          </div>
          <a className="scroll-cue" href="#about"><span aria-hidden="true">↓</span> A little more about me</a>
        </section>
        </div>
        <section className="about-section section container" id="about" aria-labelledby="about-title">
          <div><p className="eyebrow">01 / About</p><h2 id="about-title">Curiosity drives<br />what I build.</h2></div>
          <div className="about-copy"><p>I&apos;m Christian Tiquis, a software engineer and full-stack developer interested in how interfaces, services, and data come together.</p><p>My core stack spans TypeScript and React on the frontend, with Java and Spring Boot on the backend. Beyond web development, I&apos;m interested in AI, machine learning, and automation with Python and scripting.</p><p className="availability">Currently open to remote full-stack developer opportunities.</p></div>
        </section>
        <section className="section stack-section container" id="stack" aria-labelledby="stack-title">
          <div className="section-heading"><div><p className="eyebrow">02 / Toolkit</p><h2 id="stack-title">Across the stack.</h2></div><p>The technologies and tools I work with.</p></div>
          <div className="skills-grid">{skills.map((skill) => <article className="skill" key={skill.title}><span className="skill-number">{skill.number}</span><h3>{skill.title}</h3><p>{skill.description}</p><ul className="tags">{skill.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></article>)}</div>
        </section>
        <section className="section work-section container" id="work" aria-labelledby="work-title">
          <p className="eyebrow">03 / Selected work</p>
          <div className="work-panel"><div><span className="small-label">BST / BROWSER TOOLKIT</span><h2 id="work-title">Small tools. Useful every day.</h2><p>BST Tools is my collection of 13 browser-based utilities for text, code, JSON, and design. Format JSON, compare text, convert CSV, and more. Processing stays on your device.</p><a className="button button-primary" href="/tools/">Explore BST Tools <span aria-hidden="true">↗</span></a></div><span className="work-symbol" aria-hidden="true">{'{ }'}</span></div>
        </section>
        <section className="contact-section container" id="contact" aria-labelledby="contact-title"><p className="eyebrow">04 / Get in touch</p><h2 id="contact-title">Let&apos;s build<br /><span>something together.</span></h2><p>Have a full-stack opportunity or want to connect? I&apos;d love to hear from you.</p><a className="button button-primary" href="https://www.linkedin.com/in/christiantiquis/">Say hello on LinkedIn <span aria-hidden="true">↗</span></a></section>
      </main>
      <footer className="site-footer container"><p>Christian Tiquis <span> / Software Engineer</span></p><div><a href="https://github.com/christiantiquis">GitHub ↗</a><a href="https://www.linkedin.com/in/christiantiquis/">LinkedIn ↗</a><a href="#">Back to top ↑</a></div></footer>
    </>
  );
}
