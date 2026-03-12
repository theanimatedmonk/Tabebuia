import { useState } from "react";
import { SpotABloom, Tabebuia } from "./components";
import "./App.css";

const installCmd = `npm i tabebuia @rive-app/react-webgl2`;

const coreExample = `import { Tabebuia } from "tabebuia"
import "tabebuia/dist-lib/tabebuia.css"

<Tabebuia stage="peak" />
<Tabebuia stage="fading" width={300} />`;

const cardExample = `import { SpotABloom } from "tabebuia"
import "tabebuia/dist-lib/tabebuia.css"

<SpotABloom />
<SpotABloom
  defaultStage="peak"
  onStageChange={(stage) => console.log(stage)}
/>`;

const stages = ["budding", "partial", "peak", "full-glory", "fading"];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button className="copy-btn" onClick={handleCopy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function CodeBlock({ code, label }) {
  return (
    <div className="code-block">
      {label && <span className="code-label">{label}</span>}
      <pre><code>{code}</code></pre>
      <CopyButton text={code} />
    </div>
  );
}

function App() {
  const [demoStage, setDemoStage] = useState("peak");

  return (
    <div className="page">
      {/* ── Hero ── */}
      <header className="hero">
        <p className="hero-tag">Rive-powered &middot; Declarative &middot; MIT</p>
        <h1 className="hero-title">Tabebuia</h1>
        <p className="hero-sub">
          A bloom-stage animation component for React.<br />
          One prop. Zero config. Drop it in and ship.
        </p>
        <div className="hero-install">
          <code>{installCmd}</code>
          <CopyButton text={installCmd} />
        </div>
        <div className="hero-links">
          <a href="https://www.npmjs.com/package/tabebuia" target="_blank" rel="noopener noreferrer" className="hero-link npm">
            <svg viewBox="0 0 780 250" width="20" height="20"><path fill="currentColor" d="M240 250h100V50h100v200h340V0H0v250h240z"/></svg>
            View on npm
          </a>
          <a href="https://github.com/theanimatedmonk/Tabebuia" target="_blank" rel="noopener noreferrer" className="hero-link github">
            <svg viewBox="0 0 16 16" width="18" height="18"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            View on GitHub
          </a>
        </div>
      </header>

      {/* ── Live demo ── */}
      <section className="section">
        <div className="demo-area">
          <SpotABloom />
        </div>
      </section>

      {/* ── Quick start ── */}
      <section className="section">
        <h2 className="section-title">Up and running in 60 seconds</h2>

        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <div>
              <h3>Install</h3>
              <p>Add the package and its Rive peer dependency.</p>
              <CodeBlock code={installCmd} />
            </div>
          </div>

          <div className="step">
            <span className="step-num">2</span>
            <div>
              <h3>Use the core component</h3>
              <p>Just pass a <code>stage</code> prop. That's it.</p>
              <CodeBlock code={coreExample} />
            </div>
          </div>

          <div className="step">
            <span className="step-num">3</span>
            <div>
              <h3>Or use the full card</h3>
              <p>Pre-built UI with stage buttons and callbacks.</p>
              <CodeBlock code={cardExample} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive stage picker ── */}
      <section className="section">
        <h2 className="section-title">Works at every stage</h2>
        <p className="section-sub">Click a stage to see it in action.</p>

        <div className="stage-demo">
          <div className="stage-canvas">
            <Tabebuia stage={demoStage} width={360} height={225} />
          </div>
          <div className="stage-pills">
            {stages.map((s) => (
              <button
                key={s}
                className={`stage-pill ${demoStage === s ? "active" : ""}`}
                onClick={() => setDemoStage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Props reference ── */}
      <section className="section">
        <h2 className="section-title">Props</h2>

        <h3 className="table-heading">&lt;Tabebuia /&gt;</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>stage</code></td><td>string</td><td><code>"budding"</code></td><td>Bloom stage to display</td></tr>
              <tr><td><code>width</code></td><td>number</td><td><code>400</code></td><td>Width in px</td></tr>
              <tr><td><code>height</code></td><td>number</td><td><code>width &times; 0.625</code></td><td>Height in px</td></tr>
              <tr><td><code>src</code></td><td>string</td><td>bundled</td><td>Custom .riv file path (bundled by default)</td></tr>
              <tr><td><code>className</code></td><td>string</td><td>&mdash;</td><td>Additional CSS class</td></tr>
              <tr><td><code>style</code></td><td>object</td><td>&mdash;</td><td>Inline styles</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="table-heading">&lt;SpotABloom /&gt;</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>defaultStage</code></td><td>string</td><td><code>"budding"</code></td><td>Initial bloom stage</td></tr>
              <tr><td><code>onStageChange</code></td><td>function</td><td>&mdash;</td><td>Callback when stage changes</td></tr>
              <tr><td><code>src</code></td><td>string</td><td>&mdash;</td><td>Custom .riv file path</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="table-heading">Available stages</h3>
        <div className="stage-list">
          {stages.map((s) => (
            <code key={s} className="stage-tag">{s}</code>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-links">
          <a href="https://www.npmjs.com/package/tabebuia" target="_blank" rel="noopener noreferrer">npm</a>
          <span>&middot;</span>
          <a href="https://github.com/theanimatedmonk/Tabebuia" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p>Open source &middot; MIT &middot; Free forever</p>
      </footer>
    </div>
  );
}

export default App;
