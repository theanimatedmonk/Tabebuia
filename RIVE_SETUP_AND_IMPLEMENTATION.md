# Rive + React: Setup & Implementation Guide

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Install Rive Dependencies](#2-install-rive-dependencies)
3. [Basic Rive Component](#3-basic-rive-component)
4. [Using the useRive Hook](#4-using-the-userive-hook)
5. [Data Binding with View Models](#5-data-binding-with-view-models)
6. [View Model Instances](#6-view-model-instances)
7. [Reading & Writing Properties](#7-reading--writing-properties)
8. [Observability (Reactive Updates)](#8-observability-reactive-updates)
9. [Advanced: Images, Lists, Artboards, Enums](#9-advanced-images-lists-artboards-enums)
10. [Project Structure](#10-project-structure)
11. [References](#11-references)

---

## 1. Project Setup

Create a new React project using Vite:

```bash
npm create vite@latest tabebuia-rive -- --template react
cd tabebuia-rive
npm install
```

## 2. Install Rive Dependencies

The recommended package is `@rive-app/react-webgl2` which uses the Rive Renderer for full feature support (Rive Text, Vector Feathering, Data Binding, etc.):

```bash
npm install @rive-app/react-webgl2
```

### Alternative packages

| Package                       | Renderer       | Notes                                           |
|-------------------------------|----------------|------------------------------------------------|
| `@rive-app/react-webgl2`     | Rive Renderer  | **Recommended.** Full feature support.          |
| `@rive-app/react-canvas`     | Canvas 2D      | No Rive Renderer; lacks advanced features.      |
| `@rive-app/react-canvas-lite` | Canvas 2D     | Smaller bundle; no Rive Text support.           |

> **Tip:** To unlock the full Rive Renderer performance, enable the draft `WEBGL_shader_pixel_local_storage` Chrome extension via `chrome://flags` > "WebGL Draft Extensions".

## 3. Basic Rive Component

The simplest way to display a `.riv` animation:

```jsx
import Rive from '@rive-app/react-webgl2';

export default function SimpleAnimation() {
  return (
    <div style={{ width: 500, height: 500 }}>
      <Rive
        src="https://cdn.rive.app/animations/vehicles.riv"
        stateMachines="bumpy"
      />
    </div>
  );
}
```

Place your own `.riv` files in the `public/` directory and reference them with a leading `/`:

```jsx
<Rive src="/my-animation.riv" stateMachines="State Machine 1" />
```

## 4. Using the useRive Hook

For full control over playback and state machines, use the `useRive` hook:

```jsx
import { useRive } from '@rive-app/react-webgl2';

export default function InteractiveAnimation() {
  const { rive, RiveComponent } = useRive({
    src: '/my-animation.riv',
    stateMachines: 'State Machine 1',
    autoplay: false,
  });

  return (
    <div style={{ width: 500, height: 500 }}>
      <RiveComponent
        onMouseEnter={() => rive?.play()}
        onMouseLeave={() => rive?.pause()}
      />
    </div>
  );
}
```

### Key points

- `RiveComponent` **must be rendered** for Rive to instantiate (it needs the canvas in the DOM).
- The canvas size depends on its container — always wrap `RiveComponent` in a sized container or pass a `className`.
- Isolate `useRive` in its own wrapper component if you conditionally render it to avoid restart issues.

### useRive Parameters

| Parameter        | Type     | Description                                    |
|------------------|----------|------------------------------------------------|
| `src`            | string   | URL or path to the `.riv` file                 |
| `buffer`         | ArrayBuffer | Raw bytes of a `.riv` file (alternative to `src`) |
| `artboard`       | string   | Name of the artboard to use                    |
| `stateMachines`  | string \| string[] | State machine(s) to play              |
| `animations`     | string \| string[] | Linear animation(s) to play           |
| `autoplay`       | boolean  | Auto-play on load (default: `true`)            |
| `autoBind`       | boolean  | Auto-bind data binding (default: `false`)      |

### useRive Return Values

| Value             | Description                                           |
|-------------------|-------------------------------------------------------|
| `RiveComponent`   | JSX element to render the Rive canvas                 |
| `rive`            | The Rive instance with full API access                |
| `setContainerRef` | Ref callback for the container (auto-resizing)        |
| `setCanvasRef`    | Ref callback for the canvas element                   |

## 5. Data Binding with View Models

Data binding connects your React code to **View Model** properties defined in the Rive editor. This is the most powerful way to drive Rive animations with dynamic data.

### Concepts

- **View Model**: Describes a set of properties (schema). Cannot directly get/set values.
- **View Model Instance**: A concrete instance of a View Model whose properties you read/write.
- **Properties**: Typed values on an instance — numbers, strings, booleans, colors, triggers, enums, lists, images, artboards.

### Accessing a View Model

Use the `useViewModel` hook:

```jsx
import { useRive, useViewModel } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
  src: '/my-file.riv',
  stateMachines: 'State Machine 1',
});

// Option 1: Default ViewModel for the artboard
const defaultVM = useViewModel(rive);

// Option 2: Explicitly request the default
const defaultVMExplicit = useViewModel(rive, { useDefault: true });

// Option 3: By name
const namedVM = useViewModel(rive, { name: 'MyViewModelName' });
```

## 6. View Model Instances

Once you have a View Model, create an instance to read/write values:

```jsx
import { useRive, useViewModel, useViewModelInstance } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
  src: '/my-file.riv',
  stateMachines: 'State Machine 1',
  autoBind: false,
});

const viewModel = useViewModel(rive, { name: 'MyViewModel' });

// Unbound instances (not yet connected to the Rive graphic)
const defaultInstance = useViewModelInstance(viewModel, { useDefault: true });
const namedInstance = useViewModelInstance(viewModel, { name: 'MyInstanceName' });
const blankInstance = useViewModelInstance(viewModel, { useNew: true });

// Bound instances (automatically bound to the Rive graphic)
const boundDefault = useViewModelInstance(viewModel, { rive });
const boundNamed = useViewModelInstance(viewModel, { name: 'MyInstanceName', rive });
const boundNew = useViewModelInstance(viewModel, { useNew: true, rive });
```

### Auto-Binding shortcut

If you set `autoBind: true` in `useRive`, the default instance is available directly:

```jsx
const { rive, RiveComponent } = useRive({
  src: '/my-file.riv',
  stateMachines: 'State Machine 1',
  autoBind: true,
});

// Once loaded, access the auto-bound instance:
const boundInstance = rive?.viewModelInstance;
```

## 7. Reading & Writing Properties

Each property type has a dedicated hook that returns the current `value` and a `setValue` function:

```jsx
import {
  useViewModelInstanceBoolean,
  useViewModelInstanceString,
  useViewModelInstanceNumber,
  useViewModelInstanceEnum,
  useViewModelInstanceColor,
  useViewModelInstanceTrigger,
} from '@rive-app/react-webgl2';
```

### Boolean

```jsx
const { value: isActive, setValue: setIsActive } = useViewModelInstanceBoolean(
  'isToggleOn',
  viewModelInstance
);
// setIsActive(true);
```

### String

```jsx
const { value: userName, setValue: setUserName } = useViewModelInstanceString(
  'user/name',
  viewModelInstance
);
// setUserName('Rive');
```

### Number

```jsx
const { value: score, setValue: setScore } = useViewModelInstanceNumber(
  'levelScore',
  viewModelInstance
);
// setScore(100);
```

### Enum

```jsx
const { value: status, setValue: setStatus, values: statusOptions } = useViewModelInstanceEnum(
  'appStatus',
  viewModelInstance
);
// setStatus('loading');
// statusOptions → ['idle', 'loading', 'error']
```

### Color

```jsx
const {
  value: themeColor,
  setRgb: setThemeColorRgb,
  setAlpha: setThemeColorAlpha,
  setOpacity: setThemeColorOpacity,
  setRgba: setThemeColorRgba,
  setValue: setThemeColorValue,
} = useViewModelInstanceColor('ui/themeColor', viewModelInstance);

// setThemeColorRgb(0, 128, 255);
// setThemeColorRgba(0, 128, 255, 255);
// setThemeColorOpacity(0.5);
```

### Trigger

```jsx
const { trigger: playEffect } = useViewModelInstanceTrigger(
  'playButtonEffect',
  viewModelInstance,
  {
    onTrigger: () => console.log('Trigger Fired!'),
  }
);
// playEffect();
```

### Nested Property Paths

Access deeply nested properties using `/`-separated paths:

```jsx
const { value: themeName } = useViewModelInstanceString(
  'settings/theme/name',
  viewModelInstance
);
```

## 8. Observability (Reactive Updates)

All React hooks handle observability **automatically**. When a property's value changes within the Rive instance (set via hook or via internal animation binding), the `value` returned by the hook updates and triggers a React re-render.

For triggers, use the `onTrigger` callback:

```jsx
const { trigger } = useViewModelInstanceTrigger(
  'showPopup',
  viewModelInstance,
  {
    onTrigger: () => {
      console.log('Popup triggered from Rive!');
    },
  }
);
```

## 9. Advanced: Images, Lists, Artboards, Enums

### Images

```jsx
import { useViewModelInstanceImage, decodeImage } from '@rive-app/react-webgl2';

const { setValue: setImage } = useViewModelInstanceImage('profileImage', viewModelInstance);

async function loadImage() {
  const response = await fetch('https://picsum.photos/300/500');
  const buffer = await response.arrayBuffer();
  const decoded = await decodeImage(new Uint8Array(buffer));
  setImage(decoded);
  decoded.unref(); // cleanup after setting
}

// Clear the image:
// setImage(null);
```

### Lists

```jsx
import { useViewModelInstanceList } from '@rive-app/react-webgl2';

const {
  length,
  addInstance,
  addInstanceAt,
  removeInstance,
  removeInstanceAt,
  getInstanceAt,
  swap,
} = useViewModelInstanceList('todos', viewModelInstance);

function addTodo() {
  const todoVM = rive?.viewModelByName?.('TodoItem');
  const newItem = todoVM?.instance?.();
  if (newItem) {
    newItem.string('description').value = 'Buy groceries';
    addInstance(newItem);
  }
}
```

### Artboards

```jsx
import { useViewModelInstanceArtboard } from '@rive-app/react-webgl2';

const { setValue: setArtboard } = useViewModelInstanceArtboard(
  'artboard_slot',
  rive?.viewModelInstance
);

function swapArtboard() {
  const artboard = rive?.getArtboard('ArtboardBlue');
  setArtboard(artboard);
}
```

### Enums (file-level)

```jsx
const enums = rive?.enums();
console.log(enums);
// [{ name: 'Status', values: ['idle', 'active', 'done'] }, ...]
```

## 10. Project Structure

```
tabebuia-rive/
├── public/
│   └── my-animation.riv        # Place .riv files here
├── src/
│   ├── components/
│   │   └── RiveAnimation.jsx   # Rive wrapper component
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 11. References

- [Rive React Runtime (GitHub)](https://github.com/rive-app/rive-react)
- [Rive React Getting Started](https://rive.app/docs/runtimes/react/react)
- [Rive React Parameters & Return Values](https://rive.app/docs/runtimes/react/parameters-and-return-values)
- [Rive Data Binding (All Runtimes)](https://rive.app/docs/runtimes/data-binding)
- [Rive Data Binding Editor Concepts](https://rive.app/docs/editor/data-binding/overview)
- [Rive Feature Support Matrix](https://rive.app/feature-support/)
- [Choosing a Renderer](https://rive.app/docs/runtimes/choose-a-renderer/overview)
- [Quick Start CodeSandbox (React)](https://codesandbox.io/p/sandbox/rive-react-quick-start-4xy76h)
- [Data Binding CodeSandbox (React)](https://codesandbox.io/p/sandbox/rive-react-data-binding-artboards-kmvzh8)
