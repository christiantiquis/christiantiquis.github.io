import ParticlesComponent from "./components/Particles/Particles";
import "./page.css";

export default function Home() {
  return (
    <>

      <main>
        <ParticlesComponent id="tsparticles" />
        <div className="wrapper">
          <div className="header">
            <div className="hello">
              Hello, I&apos;m <span>Chris</span>.
              <span className="wave">👋</span>
            </div>
            <div className="prof">I&apos;m a Software Engineer.</div>
          </div>
        </div>
      </main>
    </>
  );
}
