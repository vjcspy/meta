# 📋 [TICKET-ID: 202412191500] - NextJS Cleanup & shadcn/ui Component Integration

## 🎯 Objective
Clean up the NextJS test app by removing all default content and CSS, then integrate new shadcn/ui components (Input, Select, Label) into the shared react-component package and test them in the NextJS app.

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

### Phase 1: Analysis & Current State Assessment
- [x] Analyze current NextJS app structure
  - **Outcome**: Found default NextJS content in index.tsx, custom CSS in globals.css, default SVG assets
- [x] Review existing react-component package
  - **Outcome**: Only Button component exists, need to add Input, Select, Label components
- [x] Check available shadcn/ui components
  - **Outcome**: 46 components available including input, select, label

### Phase 2: NextJS Cleanup

#### 2.1 Remove Default Content from Pages
- [ ] Clean up `src/pages/index.tsx`
  - Remove Geist font imports and usage
  - Remove all default NextJS boilerplate content
  - Create minimal homepage with navigation to components page
  - Keep only essential imports (Next.js Link)

- [ ] Update `src/pages/components.tsx`
  - Remove existing content
  - Prepare for new component demonstrations
  - Import new components when ready

#### 2.2 Clean Up Styles
- [ ] Simplify `src/styles/globals.css`
  - Keep only `@import "tailwindcss";`
  - Remove custom CSS variables and theme definitions
  - Remove body styling that conflicts with component library
  - Add `import 'react-component/styles';` for component styles

#### 2.3 Remove Unnecessary Assets
- [ ] Clean up `public/` directory
  - Remove default SVG files: next.svg, vercel.svg, file.svg, globe.svg, window.svg
  - Keep only favicon.ico

### Phase 3: Add New shadcn/ui Components to Shared Package

#### 3.1 Input Component Integration
- [ ] Get Input component demo and metadata
- [ ] Retrieve Input component source code
- [ ] Add to `shared/react-component/src/components/ui/input.tsx`
- [ ] Create Storybook stories for Input component
- [ ] Test Input component in Storybook

#### 3.2 Label Component Integration
- [ ] Get Label component demo and metadata
- [ ] Retrieve Label component source code
- [ ] Add to `shared/react-component/src/components/ui/label.tsx`
- [ ] Create Storybook stories for Label component
- [ ] Test Label component in Storybook

#### 3.3 Select Component Integration
- [ ] Get Select component demo and metadata
- [ ] Retrieve Select component source code
- [ ] Add to `shared/react-component/src/components/ui/select.tsx`
- [ ] Create Storybook stories for Select component
- [ ] Test Select component in Storybook

### Phase 4: Package Updates

#### 4.1 Update Package Exports
- [ ] Update `shared/react-component/src/index.ts`
  - Export Input, Select, Label components
  - Maintain existing Button export

#### 4.2 Build and Test Package
- [ ] Run build command in react-component package
- [ ] Verify dist files are generated correctly
- [ ] Test Storybook with all components

### Phase 5: NextJS Integration Testing

#### 5.1 Create Component Demonstration Page
- [ ] Update `src/pages/components.tsx`
  - Import all components: Button, Input, Select, Label
  - Create form examples using all components
  - Add interactive demonstrations
  - Test different component combinations

#### 5.2 Update Homepage
- [ ] Finalize `src/pages/index.tsx`
  - Clean, minimal design
  - Navigation to components page
  - Remove all default NextJS content

### Phase 6: Testing & Validation

#### 6.1 Storybook Testing
- [ ] Start Storybook server
- [ ] Test all component stories
- [ ] Verify styling and interactions
- [ ] Check responsive behavior

#### 6.2 NextJS Integration Testing
- [ ] Start NextJS development server
- [ ] Test homepage functionality
- [ ] Test components page with all new components
- [ ] Verify no styling conflicts
- [ ] Test form interactions and state management

#### 6.3 Build Testing
- [ ] Test NextJS production build
- [ ] Verify all imports resolve correctly
- [ ] Check for any build errors or warnings

## 📦 Target Components to Add

### Input Component
- **Purpose**: Text input fields for forms
- **Variants**: Default, with placeholder, disabled, error states
- **Integration**: Form examples with validation

### Select Component
- **Purpose**: Dropdown selection component
- **Features**: Options list, placeholder, disabled state
- **Integration**: Form examples with multiple selections

### Label Component
- **Purpose**: Accessible labels for form inputs
- **Features**: Proper association with form controls
- **Integration**: Used with Input and Select components

## 🎯 Expected File Structure After Implementation

```
shared/react-component/src/
├── components/
│   └── ui/
│       ├── button.tsx          # ✅ Existing
│       ├── input.tsx           # 🆕 New
│       ├── label.tsx           # 🆕 New
│       └── select.tsx          # 🆕 New
├── lib/
│   └── utils.ts                # ✅ Existing
└── index.ts                    # 🔄 Updated exports

stories/
├── Button.stories.ts           # ✅ Existing
├── Input.stories.ts            # 🆕 New
├── Label.stories.ts            # 🆕 New
└── Select.stories.ts           # 🆕 New

apps/nextjs/src/
├── pages/
│   ├── index.tsx               # 🔄 Cleaned up
│   └── components.tsx          # 🔄 Updated with new components
├── styles/
│   └── globals.css             # 🔄 Simplified
└── public/
    └── favicon.ico             # ✅ Only remaining asset
```

## 🚧 Potential Challenges & Solutions

### Challenge 1: Component Dependencies
- **Issue**: Select component may require additional Radix UI dependencies
- **Solution**: Check component metadata and install required dependencies

### Challenge 2: Styling Conflicts
- **Issue**: Existing NextJS styles may conflict with new components
- **Solution**: Remove all custom CSS and rely only on component library styles

### Challenge 3: Form State Management
- **Issue**: Demonstrating interactive forms with multiple components
- **Solution**: Use React state hooks for simple form examples

## 📊 Success Criteria

### ✅ NextJS Cleanup Complete
- [ ] No default NextJS content remains
- [ ] Only component library CSS is used
- [ ] Clean, minimal homepage
- [ ] No unnecessary public assets

### ✅ Component Integration Complete
- [ ] Input, Select, Label components added to shared package
- [ ] All components have Storybook stories
- [ ] Components work in NextJS app
- [ ] Interactive form examples functional

### ✅ Testing Complete
- [ ] Storybook runs without errors
- [ ] NextJS app runs without errors
- [ ] All components render correctly
- [ ] No build errors or warnings

## 🔮 Future Enhancements
- Add form validation examples
- Add more complex form components (Textarea, Checkbox, Radio)
- Add form submission handling
- Add accessibility testing
- Add visual regression testing