# 📋 [TICKET-ID: 202412191430] - Build React Component Package with shadcn/ui & Storybook

## 🎯 Objective
Create a new shared React component package in `shared/react-component` with shadcn/ui integration, Storybook support, TypeScript, and custom ESLint configuration that can be imported into the NextJS app.

## ⚠️ CRITICAL RULES - MANDATORY RULES FOR AI AGENTS
### **1. 📦 USE SHARED MODULES CORRECTLY**
- ❌ **NEVER** create separate config when shared module exists
- ❌ **NEVER** use relative path for shared modules: `../../../shared/module`
- ✅ **ALWAYS** import from module name: `import config from 'module-name'`
- ✅ **REASON**: Shared modules have their own package.json and are resolved via Node.js module resolution

#### **2. 🔄 FOLLOW PLAN AND UPDATE**
- ✅ **ALWAYS** read the entire plan before starting
- ✅ **ALWAYS** update plan when there are important changes
- ✅ **ALWAYS** test thoroughly after each step

## 🔄 Implementation Plan

### Phase 1: Analysis & Preparation
- [x] Analyze detailed requirements
  - **Outcome**: Package needs shadcn/ui integration, Storybook, TypeScript, custom ESLint config, and NextJS app integration
- [x] Define scope and edge cases
  - **Outcome**: Handle Tailwind CSS conflicts, ensure proper tree-shaking, workspace dependency resolution

### Phase 2: Implementation (File/Code Structure)
> Proposed file/directory structure for the React component package:

```
shared/react-component/
├── .storybook/                 # ✅ COMPLETED - Storybook configuration
│   ├── main.ts                 # Storybook main config with Vite
│   ├── preview.ts              # Global decorators and parameters
│   └── tailwind.css            # Tailwind imports for Storybook
├── src/                        # ✅ COMPLETED - Source code
│   ├── components/
│   │   └── ui/                 # shadcn/ui components directory
│   │       └── button.tsx      # Sample Button component
│   ├── lib/
│   │   └── utils.ts            # shadcn/ui utilities (cn function)
│   ├── styles/
│   │   └── globals.css         # Global styles and Tailwind imports
│   └── index.ts                # Main package exports
├── stories/                    # ✅ COMPLETED - Storybook stories
│   └── Button.stories.ts       # Button component stories
├── dist/                       # ✅ COMPLETED - Build output (auto-generated)
│   ├── index.js                # Built JavaScript
│   ├── index.d.ts              # TypeScript declarations
│   ├── style.css               # Compiled CSS
│   └── styles/
│       └── globals.css         # Global styles
├── components.json             # ✅ COMPLETED - shadcn/ui configuration
├── tailwind.config.js          # ✅ COMPLETED - Tailwind configuration (optimized with shared design system)
├── postcss.config.js           # ✅ COMPLETED - PostCSS configuration
├── vite.config.ts              # ✅ COMPLETED - Vite build configuration with CSS copy plugin
├── tsconfig.json               # ✅ COMPLETED - TypeScript configuration
├── eslint.config.js            # ✅ COMPLETED - ESLint configuration
├── package.json                # ✅ COMPLETED - Package configuration
└── README.md                   # ✅ COMPLETED - Usage documentation
```

### Phase 3: Package Setup & Configuration

#### 3.1 Base Package Structure
- [x] Create `package.json` with proper workspace configuration
  - **Dependencies**: React, React-DOM, TypeScript, Vite
  - **DevDependencies**: Storybook, ESLint config, Tailwind CSS
  - **Scripts**: build, dev, storybook, lint
  - **Exports**: Proper ESM/CJS exports for library with styles export

#### 3.2 TypeScript Configuration
- [x] Set up `tsconfig.json` extending `tsconfig/react-library.json`
  - **Outcome**: Proper React JSX, ES2022 target, strict mode

#### 3.3 ESLint Configuration
- [x] Configure `eslint.config.js` using `eslint-config-custom-react`
  - **Outcome**: Consistent code style with project standards

### Phase 4: shadcn/ui Integration

#### 4.1 shadcn/ui Setup
- [x] Install shadcn/ui CLI and core dependencies
  - **Dependencies**: `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`
- [x] Initialize shadcn/ui with `components.json`
  - **Configuration**: Custom component path, Tailwind config, utils path
- [x] Set up Tailwind CSS configuration with shared design system
  - **Outcome**: Proper content paths, optimized configuration extending `tailwind-config` package

#### 4.2 Utility Setup
- [x] Create `lib/utils.ts` with `cn` function
  - **Outcome**: Tailwind class merging utility for components

### Phase 5: Storybook Integration

#### 5.1 Storybook Installation
- [x] Install Storybook with React + Vite preset
  - **Version**: Latest stable with React 19 compatibility
- [x] Configure `.storybook/main.ts`
  - **Features**: Vite builder, essential addons, TypeScript support
- [x] Configure `.storybook/preview.ts`
  - **Features**: Global decorators, Tailwind CSS imports

#### 5.2 Storybook-Tailwind Integration
- [x] Set up Tailwind CSS in Storybook
  - **Outcome**: Components render with proper styling in Storybook, running at http://localhost:6006

### Phase 6: Component Development

#### 6.1 Sample Component Creation
- [x] Create Button component using shadcn/ui
  - **Features**: Variants (default, destructive, outline, secondary, ghost, link)
  - **Props**: TypeScript interface with proper typing
- [x] Create corresponding Storybook stories
  - **Stories**: All variants, different sizes, interactive examples

#### 6.2 Build System
- [x] Configure Vite for library build with CSS copy plugin
  - **Output**: ESM and CJS formats, TypeScript declarations, CSS files
  - **Externals**: React, React-DOM as peer dependencies
  - **Special**: Custom plugin to copy CSS files to dist directory
- [x] Set up proper package exports
  - **Outcome**: Tree-shaking support, proper module resolution, styles export

### Phase 7: NextJS Integration

#### 7.1 Package Integration
- [x] Add package to `apps/nextjs/package.json`
  - **Dependency**: `"react-component": "workspace:*"`
- [x] Import styles in NextJS app
  - **Implementation**: `import 'react-component/styles';` in components page
  - **Note**: NextJS uses Tailwind CSS v4 with `@import "tailwindcss"` approach

#### 7.2 Integration Testing
- [x] Create test page in NextJS app (`/components`)
  - **Test**: Import and use Button component
  - **Verify**: Styling works correctly, no build errors, running at http://localhost:3000

### Phase 8: Testing & Validation

#### 8.1 Manual Testing
- [x] Test Storybook functionality
  - **Scenarios**: 
    1. Run `pnpm storybook` - should start without errors
    2. All Button variants render correctly
    3. Interactive controls work properly
  - **Result**: PASS - Storybook running successfully at http://localhost:6006

- [x] Test NextJS integration
  - **Scenarios**:
    1. Import Button component in NextJS page
    2. Component renders with correct styling
    3. Build process completes successfully
  - **Result**: PASS - Components page loads successfully at http://localhost:3000/components

- [x] Test build process
  - **Scenarios**:
    1. Run `pnpm build` - generates dist folder
    2. TypeScript declarations are created
    3. Package can be imported correctly
  - **Result**: PASS - Build generates all required files including CSS

#### 8.2 Workspace Integration
- [x] Verify pnpm workspace resolution
  - **Test**: Package appears in workspace dependencies
- [x] Test ESLint configuration
  - **Test**: Linting works with custom React config

## 📦 Key Dependencies & Versions

### Core Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "@radix-ui/react-slot": "^1.0.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### DevDependencies
```json
{
  "@storybook/react-vite": "^8.0.0",
  "@storybook/addon-essentials": "^8.0.0",
  "@vitejs/plugin-react": "^4.0.0",
  "vite": "^5.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "autoprefixer": "^10.0.0",
  "postcss": "^8.0.0",
  "eslint-config-custom-react": "workspace:*",
  "tsconfig": "workspace:*"
}
```

## 📊 Summary of Results

### ✅ Completed Achievements
- ✅ **Package Structure**: Complete React component package with shadcn/ui integration
- ✅ **Storybook Integration**: Fully functional Storybook at http://localhost:6006
- ✅ **NextJS Integration**: Successfully integrated with NextJS app at http://localhost:3000/components
- ✅ **Build System**: Vite build with CSS copy plugin for proper style distribution
- ✅ **Tailwind CSS Optimization**: Shared design system configuration in `tailwind-config` package
- ✅ **TypeScript Support**: Full TypeScript declarations and proper typing
- ✅ **ESLint Configuration**: Custom React ESLint config integration
- ✅ **Workspace Resolution**: Proper pnpm workspace dependency resolution
- ✅ **Style Export**: Proper CSS file export and import mechanism (`react-component/styles`)

## 🚧 Outstanding Issues & Follow-up

### ⚠️ Known Issues
- ⚠️ **Intermittent Module Resolution**: Occasional `Module not found: Can't resolve 'react-component/styles'` error that resolves after rebuild
- ⚠️ **Tailwind CSS Version Mismatch**: NextJS uses Tailwind CSS v4 while react-component uses v3 (works but could be optimized)

### 🔮 Future Improvements
- [ ] Add more shadcn/ui components (Input, Card, Dialog, etc.)
- [ ] Set up automated testing with Jest/Vitest
- [ ] Add component documentation generation
- [ ] Set up automated publishing workflow
- [ ] Add visual regression testing with Chromatic
- [ ] Unify Tailwind CSS versions across the monorepo
- [ ] Add shared design tokens for better consistency
- [ ] Implement hot module replacement for better development experience

## 🎯 Key Optimizations Implemented

### 🔧 Tailwind CSS Shared Configuration
- **Problem**: Duplicate Tailwind configuration between `react-component` and potential future packages
- **Solution**: Created shared `designSystem` object in `tailwind-config` package
- **Benefits**: 
  - Eliminated code duplication
  - Centralized design system management
  - Improved maintainability and consistency
  - Reduced bundle size and build time

### 🔧 CSS Distribution Strategy
- **Problem**: CSS files not being copied to dist directory during build
- **Solution**: Custom Vite plugin to copy CSS files
- **Benefits**:
  - Proper style distribution
  - Support for `react-component/styles` import
  - Maintained build performance