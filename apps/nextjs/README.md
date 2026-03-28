# Next.js + shadcn/ui + Storybook Project

A modern Next.js application with shadcn/ui components and Storybook for UI development and documentation.

## Getting Started

### Development Server

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Storybook

Run Storybook for component development and documentation:

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the Storybook interface.

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── stories/          # Storybook stories
├── pages/            # Next.js pages
├── lib/              # Utility functions
└── styles/           # Global styles
```

## UI Development Requirements

### shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for UI components. All UI development should utilize these components.

- **Adding Components**: Use the shadcn/ui CLI to add new components:
  ```bash
  pnpm dlx shadcn@latest add [component-name]
  ```
- **Component Location**: All shadcn/ui components are located in `src/components/ui/`

### Storybook

Storybook is used for component documentation, development, and testing.

- **Story Location**: All stories are located in `src/stories/`
- **Running Storybook**: Use `pnpm storybook` to start the development server
- **Accessing Storybook**: Visit [http://localhost:6006](http://localhost:6006)
- **Creating Stories**: Create `.stories.tsx` files in the `src/stories/` directory for component documentation
