# React Component Library

A shared React component library built with shadcn/ui, TypeScript, and Storybook.

## Features

- 🎨 **shadcn/ui Integration** - Beautiful, accessible components
- 📚 **Storybook** - Interactive component documentation
- 🔧 **TypeScript** - Full type safety
- 🎯 **ESLint** - Custom React configuration
- 🏗️ **Vite** - Fast build system
- 🎨 **Tailwind CSS** - Utility-first styling

## Installation

This package is part of the monorepo workspace. Install dependencies:

```bash
pnpm install
```

## Development

### Build the library

```bash
pnpm build
```

### Start Storybook

```bash
pnpm storybook
```

### Lint code

```bash
pnpm lint
pnpm lint:fix
```

## Usage

### In NextJS App

1. Add to your `package.json`:

```json
{
  "dependencies": {
    "react-component": "workspace:*"
  }
}
```

2. Import components:

```tsx
import { Button } from 'react-component';
import 'react-component/styles';

function App() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

### Available Components

#### Button

```tsx
import { Button } from 'react-component';

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔥</Button>
```

## Adding New Components

1. Create component in `src/components/ui/`
2. Export from `src/index.ts`
3. Add Storybook stories in `stories/`
4. Update this README

## Tailwind CSS Integration

The package includes a complete Tailwind CSS setup with:

- CSS custom properties for theming
- Dark mode support
- shadcn/ui design tokens

Make sure your consuming app includes the package styles:

```tsx
import 'react-component/styles';
```

## TypeScript

All components are fully typed with TypeScript. The build process generates declaration files for proper IDE support.

## Contributing

1. Follow the existing code style
2. Add Storybook stories for new components
3. Ensure TypeScript types are properly exported
4. Test components in the NextJS app