# Tabebuia

A Rive-powered bloom-stage animation component for React. One prop. Zero config.

[![npm version](https://img.shields.io/npm/v/tabebuia.svg)](https://www.npmjs.com/package/tabebuia)
[![license](https://img.shields.io/npm/l/tabebuia.svg)](https://github.com/theanimatedmonk/Tabebuia/blob/main/LICENSE)

## Install

```bash
npm i tabebuia @rive-app/react-webgl2
```

## Quick Start

### Core component — one prop, zero config

```jsx
import { Tabebuia } from "tabebuia"
import "tabebuia/dist-lib/tabebuia.css"

function App() {
  return <Tabebuia stage="peak" />
}
```

### Pre-built card with stage buttons

```jsx
import { SpotABloom } from "tabebuia"
import "tabebuia/dist-lib/tabebuia.css"

function App() {
  return <SpotABloom onStageChange={(stage) => console.log(stage)} />
}
```

## Stages

| Stage | Description |
|---|---|
| `"budding"` | Early growth, dense leaves |
| `"partial"` | Some flowers appearing |
| `"peak"` | Rich bloom |
| `"full-glory"` | Maximum flowers, no leaves |
| `"fading"` | Dry leaves, flowers gone |

## Props

### `<Tabebuia />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `stage` | `string` | `"budding"` | Bloom stage to display |
| `width` | `number` | `400` | Width in px |
| `height` | `number` | `width × 0.625` | Height in px |
| `src` | `string` | bundled | Custom `.riv` file path |
| `artboard` | `string` | `"Tabebuia"` | Artboard name in the `.riv` file |
| `stateMachine` | `string` | `"Tabebuia"` | State machine name |
| `viewModel` | `string` | `"Tabebuia"` | ViewModel name |
| `className` | `string` | — | Additional CSS class |
| `style` | `object` | — | Inline styles |

### `<SpotABloom />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultStage` | `string` | `"budding"` | Initial bloom stage |
| `onStageChange` | `function` | — | Callback when stage changes |
| `src` | `string` | — | Custom `.riv` file path |
| `className` | `string` | — | Additional CSS class on the card |

## How it works

The `.riv` animation file is bundled inside the package — no file downloads, no public folder setup. Each stage maps to a pre-configured Rive ViewModel instance. When you change the `stage` prop, the component binds the matching instance to the Rive runtime.

## Development

```bash
# Clone the repo
git clone https://github.com/theanimatedmonk/Tabebuia.git
cd Tabebuia

# Install dependencies
npm install

# Run the demo site
npm run dev

# Build the library
npm run build:lib
```

## License

MIT
