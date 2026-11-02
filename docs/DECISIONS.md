# Architecture decision record

## ADR-001 — pnpm as package manager

**Status:** Accepted

**Decision:** Pin pnpm through `packageManager` and use it for all project scripts.

**Reason:** The project explicitly standardizes on pnpm and its lockfile provides deterministic installs.

## ADR-002 — Single-page section navigation

**Status:** Accepted

**Decision:** Start with semantic in-page anchors and a typed section registry.

**Reason:** The initial product is one continuous cinematic experience. A router would add complexity before distinct URLs are needed.

## ADR-003 — Tailwind CSS with project tokens

**Status:** Accepted

**Decision:** Use Tailwind CSS while retaining the approved brand palette as CSS custom properties.

**Reason:** Tokens remain usable by CSS, GSAP and canvas integrations while Tailwind supports later component composition.

## ADR-004 — One motion system and one 3D renderer

**Status:** Accepted

**Decision:** Use GSAP for coordinated DOM motion and React Three Fiber for Three.js scenes.

**Reason:** Clear ownership prevents competing animation lifecycles and duplicated timing logic.

## ADR-005 — No client-side secrets

**Status:** Accepted

**Decision:** Treat every Vite environment variable as public. Future authenticated integrations must use a server-side boundary or provider-managed flow.

**Reason:** Vite embeds `VITE_` values in browser assets.

## Initial dependencies

| Package group | Purpose |
| --- | --- |
| React and React DOM | Component runtime and browser rendering |
| Vite and its React plugin | Development server and production bundling |
| TypeScript | Strict static type checking |
| Tailwind CSS and Vite plugin | Utility styling and build-time CSS processing |
| GSAP | Coordinated motion and ScrollTrigger work in later sprints |
| Three.js, React Three Fiber and Drei | 3D scene runtime and React helpers for Sprint 1 |
| Lucide React | Accessible, consistent interface icons |
| ESLint, typescript-eslint and React plugins | Static code-quality checks |
| Vitest | Fast unit tests aligned with Vite configuration |
| Fontsource packages | Locally bundled approved fonts, limited to Latin subsets |

## ADR-006 — Conditional 3D experience

**Status:** Accepted

**Decision:** Load the Builder Core scene only on viewports above 760 px when WebGL is available and reduced motion is not requested. Use the CSS composition as the mobile and accessibility fallback.

**Reason:** The R3F/Three.js scene adds about 252 KB gzip in its own lazy chunk. This keeps the mobile and reduced-motion path free from that download. Reassess bundle size and device performance during Sprint 5 QA.
