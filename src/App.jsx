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
        <p>Open source &middot; MIT &middot; Free forever</p>
      </footer>
    </div>
  );
}

export default App;
