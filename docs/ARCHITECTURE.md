# Architecture

## Runtime shape

BUILD.OS is a client-rendered React application built by Vite. It uses in-page section navigation for the initial single-page experience. Feature routing can be introduced only when distinct URLs provide user value.

```text
src/main.tsx
  └─ AppErrorBoundary
      └─ App
          ├─ SectionNavigation
          ├─ feature sections
          └─ footer
```

## Source boundaries

- `src/app`: application composition and top-level recovery.
- `src/components`: visual components grouped by product section.
- `src/data`: typed content registries; verified portfolio content belongs here.
- `src/hooks`: reusable React behavior, including user preferences.
- `src/lib`: framework-light helpers and integration adapters.
- `src/styles`: global tokens, reset and cross-section layout.
- `src/types`: shared domain contracts.
- `public`: static fonts, images and optimized 3D models.

## Motion and 3D

GSAP coordinates page and scroll timelines. React Three Fiber owns Three.js scenes and Drei helpers. Components must check reduced-motion preferences, clean up animations and provide a usable non-canvas fallback. Heavy scenes should load on demand.

## Content model

Content is separate from visual components and must satisfy shared TypeScript types. Unknown achievements, metrics and personal details remain explicit placeholders until the owner verifies them.

## Security and deployment

Only `VITE_` variables intended for public browser exposure may be referenced in client code. Secrets never belong in Vite environment variables. AWS Amplify Hosting is planned for Sprint 5; no AWS resource is created during Sprint 0.
