# @mrreality255/turbo-react

A retro-themed React UI component library inspired by classic terminal and DOS aesthetics. Features a full palette-based theming system, responsive layout primitives, form integration, and CSS module styling powered by CSS custom properties.

## Installation

```bash
npm install @mrreality255/turbo-react
```

Import the stylesheet in your app entry point:

```tsx
import "@mrreality255/turbo-react/style.css";
```

### Peer Dependencies

- `react` >= 19
- `react-dom` >= 19

## Quick Start

```tsx
import { TAppLayout, TWindow, TButton } from "@mrreality255/turbo-react";

function App() {
  return (
    <TAppLayout
      palette="green"
      sizeUnit="em"
      sizes={{ header: 3, footer: 2, left: 18 }}
      header={<TWindow palette="dark" noShadow border="none">My App</TWindow>}
      footer={<TWindow palette="dark" noShadow border="none">Footer</TWindow>}
    >
      <TWindow caption="Hello World" palette="green">
        <TButton onClick={() => alert("Clicked!")}>Click Me</TButton>
      </TWindow>
    </TAppLayout>
  );
}
```

## Components

### Atoms

Core UI building blocks located in `components/atoms`:

| Component | Description |
|-----------|-------------|
| `TButton` | Button with variants: `standard`, `plain`, `link`, `text`. Supports `default`, `down`, `fill`, and preset widths (`w0`, `w1`). |
| `TCheckbox` | Checkbox input with label support. |
| `TRadioButton` | Radio button input. |
| `TTextBox` | Text input with `label`, `prefix`, `suffix`, alignment, mode (`text`, `password`, `number`, `email`), and keyboard events. |
| `TDropDown` | Dropdown select built on TTextBox with filter support. |
| `TWindow` | Panel/card component with optional caption, close button, borders (`std`, `single`, `none`), shadows, hotkeys, and `fill` mode for viewport-filling layouts. |
| `TTable` | Data table with typed columns, resizable headers, sort icons, click handlers, and custom formatters. |
| `TMenu` | Vertical menu list with keyboard navigation, selection, separators, prefixes, and secondary labels. |
| `TProgressBar` | Progress/slider control with customizable block width and value display. |
| `TGroupBox` | Bordered group container with label. |
| `THeading` | Section heading element. |
| `TNameValue` | Key-value pair display, supports item lists and action columns. |
| `TNotification` | Timed notification display. |
| `TGlass` | Overlay/backdrop layer for modals. |
| `TLoadingBar` | Animated loading indicator. |
| `TViewport` | Positioned container with absolute rect placement, centering, scrollbar, and padding options. |

### Layout

Higher-level layout components:

| Component | Description |
|-----------|-------------|
| `TAppLayout` | Full-page application shell with header, footer, left/right panels, mobile overrides, size units, and scrollbar palette. |
| `TColLayout` | Multi-column grid layout with configurable `cols`, `gap`, and `minWidth`. |
| `THorizLayout` | Horizontal split layout with left/right slots and alignment modes. |
| `TRowLayout` | Vertical stacking layout with gap between children. |
| `TVertLayout` | Vertical layout with optional header/footer slots. |

### Forms

Form integration built on `@mrreality255/turbo-react-forms`:

```tsx
import { useForm, useFormContext } from "@mrreality255/turbo-react";
```

Pre-configured form controls:
- `textBox` — text input field
- `checkBox` — boolean checkbox
- `dropDown` — dropdown select
- `radioButton` — radio toggle
- `progressBar` — numeric progress/slider

Forms render inside a `TFormWindow` wrapper and support subforms, group boxes, validation hints, and loading states.

## Theming

The library uses a CSS custom property palette system. Eight built-in palettes are available:

| Palette | Style |
|---------|-------|
| `blue` | Cyan-on-navy, classic terminal |
| `green` | Green-on-black, Matrix-style |
| `cyan` | White-on-teal |
| `dark` | Yellow-on-dark, amber terminal |
| `grey` | Black-on-grey, neutral/modern |
| `red` | Yellow-on-red, danger/alert |
| `dialog` | Dialog/modal styling |
| `mono` | Monochrome/colorless |

### Applying Palettes

Pass `palette` as a prop to any component:

```tsx
<TWindow palette="green" caption="Green Window">
  Content inherits the palette
</TWindow>
```

Palettes cascade through React context — child components inherit the nearest parent's palette unless overridden.

### How It Works

Each palette defines CSS custom properties (`--plt-fg`, `--plt-bg`, `--plt-border`, etc.) that components reference in their CSS modules. The `usePalette` hook resolves the active palette from props or context and applies the corresponding CSS class.

## Hooks

| Hook | Description |
|------|-------------|
| `usePalette(styles, props)` | Resolves the active palette and returns a `styles()` helper for class name composition with palette-aware CSS modules. |
| `useMobile()` | Returns `true` when viewport width is <= 768px. Reactive to window resize. |
| `useWidth(category)` | Returns `true` when viewport meets a minimum width. Categories: `xs` (0), `sm` (640), `md` (768), `lg` (1024), `xl` (1280). Also accepts pixel numbers. |
| `useAutoFocus(props, ref)` | Auto-focuses an input element when `autoFocus` prop is set. |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the demo app dev server (Vite) |
| `npm run build` | TypeScript check + library build (ES + UMD output in `dist/`) |
| `npm run build-demo` | Build the demo application |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run preview` | Preview production build |

## Build Output

The library builds to:
- `dist/index.es.js` — ES module
- `dist/index.umd.js` — UMD module
- `dist/index.d.ts` — TypeScript declarations
- `dist/index.css` — Compiled styles

React and ReactDOM are externalized (not bundled).

## Tech Stack

- React 19
- TypeScript 5.9
- Vite 7 (library mode with `vite-plugin-dts`)
- CSS Modules with custom properties for theming
- Luxon for date formatting (used in Table)
- ESLint + Prettier

## License

Developed by Martin Mojzis.
