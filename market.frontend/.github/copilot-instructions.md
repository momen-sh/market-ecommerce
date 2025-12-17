## Quick project summary

- Framework: Angular 16 (CLI-generated app). Source root: `src/`. Main entry: `src/main.ts`.
- App module: `src/app/app.module.ts` — currently declares `MainScreenComponent` and `NavbarComponent`.
- Minimal dependencies (no HttpClientModule, no state library). See `package.json` for exact versions (Angular 16.x, TypeScript ~5.1).

## How to run and test (developer workflows)

- Install dependencies: `npm install`.
- Start dev server (development config with source maps): `npm start` (runs `ng serve`). Dev server default: http://localhost:4200/.
- Build production: `npm run build` (uses `ng build` — `angular.json` sets production defaults and outputPath `dist/market`).
- Run unit tests: `npm test` (Karma + Jasmine configured by default in this project).

Notes: The `angular.json` file contains `development` and `production` build options. Development has `sourceMap: true` and named chunks enabled.

## Project structure & patterns to know

- Components live under `src/app/` in nested folders. Example:
  - `src/app/main_screen/main-screen/` contains `main-screen.component.{ts,html,css}`. The HTML currently is only `<app-navbar></app-navbar>`.
  - `src/app/navbar/navbar/` contains the navbar component and template.
- Component file naming follows the Angular CLI convention: `my-name.component.ts|html|css`.
- Routing is wired via `src/app/app-routing.module.ts` and the root module imports `AppRoutingModule`.

Conventions observed:
- Components are registered in `AppModule` (`src/app/app.module.ts`) rather than lazy-loaded feature modules.
- New components are expected to be generated with the Angular CLI: `ng generate component <path>` (preserves naming/structure conventions).

## Integration points & common edits

- To add HTTP services, import `HttpClientModule` in `AppModule` and add services under `src/app/services/` (there is a `services/main_screen_Service/` folder in the tree — check it for existing code).
- Global styles: `src/styles.css`. Component styles are local to each component file.
- To change the dev/prod behavior (source maps, optimizer, etc.) edit `angular.json` under the `projects.market.architect.build.configurations` section.

## Things an AI agent should check before editing

1. Confirm Angular/TypeScript compatibility when adding dependencies (see `package.json` versions).
2. If modifying injection or adding providers, update `AppModule` imports/ providers consistently.
3. Keep component selectors (`app-...`) consistent with folder names; e.g., use `<app-navbar>` as shown in `src/app/main_screen/main-screen/main-screen.component.html`.

## Small examples (explicit references)

- Where to look for the current top-level layout: `src/app/main_screen/main-screen/main-screen.component.html` (contains `<app-navbar>`).
- Component registration: `src/app/app.module.ts` (declarations/imports/bootstrap).
- Build config and output path: `angular.json` (search for `outputPath` and `development` configuration).

## Useful commands (explicit)

- Install: `npm install`
- Dev server (with dev config/source maps): `npm start` or `ng serve --configuration development`
- Build production: `npm run build` or `ng build --configuration production`
- Unit tests: `npm test` or `ng test`

## Final notes for an AI coding agent

- This repo is a small CLI-generated Angular app with a simple component tree. Focus changes on small, localized edits (add components, templates, or services) and always run `npm start` and `npm test` locally after changes.
- Avoid adding global frameworks (state libraries) unless explicitly requested; the repo currently uses vanilla Angular modules and services.

If you want, I can tighten this further with examples of common change patterns (add a service, wire HttpClient, or scaffold a lazy-loaded module). Tell me which example you'd like and I'll update the file.
