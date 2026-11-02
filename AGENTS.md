# BUILD.OS — Project Constitution

## 1. Project identity

BUILD.OS — The Builder Universe is a premium, cinematic, interactive personal portfolio. It communicates technical capabilities, real projects and engineering decisions, leadership and community building, personal interests, creative identity, and a genuine builder mindset.

- Core statement: **Build beyond the expected.**
- Brand signature: **BUILD. EXPLORE. SHARE.**

## 2. Creative direction

Use cinematic futuristic editorial design, premium Web3-inspired aesthetics, AWS-inspired technical precision, minimal navigation, an interactive developer environment, and dark immersive compositions.

Approved color tokens:

```css
--color-void: #070B16;
--color-deep-navy: #0D1426;
--color-panel: #151E33;
--color-elevated: #202C46;
--color-violet: #8B5CF6;
--color-lavender: #C4B5FD;
--color-cyan: #67DDF5;
--color-aws: #FF9900;
--color-github: #39D98A;
--color-spotify: #1ED760;
--color-text: #F4F7FB;
--color-muted: #8F9BB3;
```

Use Space Grotesk for headings, Inter for body and interface text, and JetBrains Mono for terminal and telemetry. Do not introduce unapproved colors or typography.

## 3. Technology stack

- React, TypeScript, Vite and Tailwind CSS
- Three.js, React Three Fiber and Drei
- GSAP and GSAP ScrollTrigger
- Lucide React
- AWS Amplify Hosting
- pnpm for package management

Use GSAP for coordinated motion and React Three Fiber for 3D. Avoid competing animation libraries. Explain any new dependency before adding it.

## 4. Core product sections

1. Cinematic 3D Hero
2. Interactive Terminal
3. Tech Universe
4. Project Missions
5. Leadership & Community Builder
6. Life / Telemetry
7. Hidden Easter Egg
8. Contact

Keep navigation minimal.

## 5. Engineering principles

- Use small, modular and reusable React components.
- Use strict TypeScript and separate content from presentation.
- Keep business logic outside visual components.
- Use semantic HTML and maintain accessibility.
- Optimize rendering and animation.
- Respect `prefers-reduced-motion`.
- Support desktop, tablet and mobile.
- Avoid unnecessary global state and duplicated animation logic.
- Do not use arbitrary timeouts to synchronize animation.

## 6. Security

- Never expose AWS credentials, GitHub tokens or Spotify tokens.
- Never commit `.env` files.
- Never use `eval` or execute arbitrary terminal input.
- Never expose private repository information.
- Never create permanent AWS access keys; use temporary credentials.
- Do not create or delete AWS resources without authorization.

## 7. Content accuracy

Never invent project achievements, contributions, metrics, professional experience, community impact or repository information. Use clearly labelled placeholders when facts are unavailable. Ask before publishing unverified personal information.

## 8. Development workflow

For every sprint:

1. Inspect the repository and read this constitution and relevant documentation.
2. Identify existing working functionality and affected files.
3. Prepare a plan and implement incrementally.
4. Run tests, lint and the production build; fix introduced errors.
5. Review responsive behavior and update documentation.
6. Report results and create a Git commit.

Do not rewrite the whole application for one feature. Never claim validation without executing the checks.

## 9. Definition of quality

The result must feel like a premium digital product. Prioritize functionality, visual quality, usability, performance, accessibility and maintainability, in that order. Animation must communicate meaning.
