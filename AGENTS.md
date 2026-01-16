# AGENTS.md for Enorganico Project

This file contains guidelines for build/lint/test commands, code style, and conventions to ensure consistency across the Enorganico website codebase. It is designed for use by agentic coding tools (e.g., yourself) operating in this repository.

## Build, Lint, and Test Commands

### Available Commands (from package.json)
- **Development Server**: `npm run dev` - Starts Astro dev server at localhost:4321
- **Build**: `npm run build` - Builds production site to ./dist/ and copies .nojekyll for GitHub Pages
- **Predeploy**: `npm run predeploy` - Runs build as prerequisite for deploy
- **Deploy**: `npm run deploy` - Deploys to GitHub Pages using gh-pages
- **Preview**: `npm run preview` - Previews production build locally
- **Astro CLI**: `npm run astro` - Access Astro CLI commands (e.g., `npm run astro check`)

### Recommended Additions (Not Yet Configured)
Add these scripts to package.json for better code quality:
- **Lint**: `npm run lint` - Run ESLint on .astro, .js, .ts files (install eslint, eslint-plugin-astro)
- **Format**: `npm run format` - Run Prettier on all code files
- **Typecheck**: `npm run typecheck` - Run Astro check for TypeScript errors
- **Test**: `npm run test` - Run tests with Vitest or Jest
- **Test Single File**: `npm run test -- --run path/to/test.spec.js` (once testing is set up)

Run lint/typecheck before commits: `npm run lint && npm run typecheck`

## Code Style Guidelines

### General Principles
- **Language**: Primarily Spanish for HTML content (lang="es"), English for code comments and technical docs
- **TypeScript**: Strict mode enabled (extends astro/tsconfigs/strict). Use types for all props and variables
- **Formatting**: Use Prettier with config in .prettierrc (double quotes, semicolons, 2-space tabs, 500-char print width, bracketSameLine true, astroAllowShorthand false)

### Imports
- Group imports by type with comments:
  ```astro
  // Components
  import Section1 from "../components/home/Section1.astro";
  // Layouts
  import Layout from "../layouts/Layout.astro";
  // Styles
  import "../styles/main.scss";
  ```
- Use relative paths for local imports
- In SCSS: Use `@use` for modular imports (e.g., `@use 'abstracts/variables';`)

### Naming Conventions
- **Astro Components**: PascalCase (e.g., Section1.astro, SectionProductCarousel.astro)
- **CSS Classes**: BEM-like with `enorganico-` prefix, kebab-case
  - Block: `enorganico-[component]` (e.g., `enorganico-hero`, `enorganico-slider`)
  - Element: `__[element]` (e.g., `enorganico-hero__video`)
  - Modifier: `--[modifier]` (e.g., `enorganico-slider__track--item`)
- **SCSS Variables**: `$enorganico-[name]` in kebab-case (e.g., `$enorganico-primary-color`)
- **CSS Custom Properties**: `--enorganico-[name]` in kebab-case
- **JavaScript**: camelCase for variables/functions (e.g., `trackSlides`, `loadSwiperFromCDN`)
- **SCSS Maps**: Use kebab-case keys (e.g., `$breakpoints: (mobile: 768px)`)

### Error Handling
- Wrap async operations (e.g., CDN loads, GSAP init) in try-catch:
  ```js
  try {
    // code
  } catch (error) {
    console.log('Error loading library:', error);
  }
  ```
- Check for library availability: `if (typeof gsap === "undefined") { console.warn("GSAP no cargado"); return; }`
- Use environment checks: `if (window.location.hostname === "localhost")` for dev-specific logic
- Provide fallbacks for failed loads (e.g., default styles or disabled features)

### SCSS Organization
- Structure main.scss with grouped @use imports (abstracts, base, components, pages, themes, vendors)
- Use mixins for reusable logic (e.g., media queries: `@mixin mq($width, $type: max)`)
- Leverage maps for themes (e.g., `$enorganico-colors`, `$breakpoints`)
- Prefer CSS variables for runtime theming
- Nest selectors deeply for component specificity

### Framework Integration
- **Astro**: Use `<script is:inline>` for non-bundled JS; group Astro frontmatter imports
- **TailwindCSS**: Combine with Bootstrap classes (e.g., `container-fluid row col-12 before:bg-black/75`)
- **GSAP/ScrollTrigger**: Register plugins conditionally; use `scrub` for smooth animations
- **Swiper**: Load from CDN with Promise checks; use bundle imports in components
- **Odoo**: Transform paths in dev (e.g., `/web/` to `https://enorganico.odoo.com/web/`)
- **PostCSS**: Strip unwanted rules (@layer, @property) for Tailwind compatibility

### Additional Best Practices
- **Animations**: Use GSAP for hero videos, scroll triggers; test performance on mobile
- **Assets**: Store in /public/assets/; use absolute paths in code
- **Responsive**: Use Bootstrap grid + Tailwind utilities; test video backgrounds on devices
- **SEO/Accessibility**: Include alt text, lang="es", semantic HTML
- **Commits**: Run build/lint before pushing; use descriptive messages
- **Updates**: Modify this file when adding new conventions or tools

## Additional Rules
No Cursor rules (.cursor/rules/ or .cursorrules) or Copilot rules (.github/copilot-instructions.md) found. Add here if introduced.

## Contributing
Follow these guidelines for all changes. Update AGENTS.md for new patterns. Run `npm run build` to verify before commits.