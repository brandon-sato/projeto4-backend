# AGENTS.md

## Commands
- Install: `npm ci` (lockfile present; Docker also uses `npm ci`).
- Dev server: `npm run dev` (`tsx watch src/server.ts`).
- Build: `npm run build` (`tsc`, outputs to `dist/`).
- Start built app: `npm start` (`node dist/server.js`).
- No test, lint, or typecheck scripts are configured in `package.json`; verify changes with `npm run build` and targeted manual checks.

## Environment & runtime
- Copy `.env.example` to `.env`; required vars: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `SERVER_PORT`, `JWT_SECRET`.
- `src/database/sequelize.ts` and `src/server.ts` both call `dotenv.config()`. MySQL connection uses the `MYSQL_*` vars; server listens on `SERVER_PORT`.
- Startup flow: `initializeAssociations()` -> `connectToDb()` -> `app.listen(...)`. `connectToDb()` runs `sequelize.authenticate()` and `sequelize.sync()`; model changes can affect the DB schema on startup.

## Architecture
- Entrypoint: `src/server.ts` registers all Express routes and middleware; there are no separate router modules.
- Layout: `src/controllers/`, `src/models/`, `src/middlewares/`, `src/database/`. `dataBaseExemplo/lotusspa3.sql` is a reference SQL example, not an automated migration.
- Stack: Node + TypeScript (`strict`, CommonJS, `rootDir src`, `outDir dist`) + Express 5 + Sequelize 6 + MySQL (`mysql2`).

## API & code conventions
- Auth: `POST /users` and `POST /users/login` are public; `app.use(authMiddleware)` protects routes below it. JWT is HS256, expires in `1h`; `authMiddleware` stores payload in `res.locals.authUser` (`id`, `email`, `name`).
- User self-protection: `updateUser`/`deleteUser` only allow the authenticated user to modify/delete their own account.
- Controller pattern: most controllers wrap handlers with `withErrorHandling(...)` from `src/controllers/controllerUtils.ts`, which maps Sequelize unique/FK/validation errors to 409/400/500. `src/controllers/auth.ts` and `src/controllers/user.ts` export plain async functions.
- Validation pattern: follow existing controllers/models. Models often expose `validate*Data()` returning string arrays; controllers validate request shape, `build()`/mutate, run model validation, then `save()`. Reuse `controllerUtils` helpers (`parseId`, `isRequestData`, etc.) where applicable.
- Domain naming is mixed: code identifiers are often English, while many DB tables/columns/routes use Portuguese names (e.g. `atendimento`, `id_cliente`). Match the surrounding file's convention.

## Docker
- `Dockerfile` is a multi-stage Node 22 Alpine build: builds TS, installs prod deps, copies `dist`, exposes `3001`, and runs `npm start`. Container still needs runtime env vars, including `SERVER_PORT`.
