# Rules — my-client-bare

## Project structure

- `website/` — Todo el código de la app web (Devvit TypeScript)
- `tools/` — Herramientas Python, scripts .sh, ejecutables no-web
- `docs/` — Documentación en Markdown
- Raíz del proyecto — Solo `.gitignore` y directorios principales

## Code conventions

### TypeScript (website/)
- Usar `strict` mode siempre
- Preferir `type` sobre `interface` para tipos compartidos
- Imports con extensión `.ts` (permitido por `allowImportingTsExtensions`)
- `verbatimModuleSyntax: true` — usar `import type` para type-only imports
- `isolatedDeclarations: true` — tipos explícitos en exports

### Python (tools/python/)
- Usar type hints (`from __future__ import annotations`)
- FastAPI para el servidor web
- PRAW para API de Reddit
- Variables de entorno vía `python-dotenv`
- MySQL con `mysql-connector-python`

### Build
- Devvit: `esbuild` (vía `website/tools/build.ts`)
- Servidor Python: `uvicorn`

## Git
- Commits en español o inglés
- Prefijos: `feat:`, `fix:`, `chore:`, `docs:`, `tools:`
- No committear: `node_modules/`, `dist/`, `.env`, `*.zip`

## Servidor Python
- Iniciar con: `cd tools/python && python main.py`
- Puerto configurable via `--port` flag o `PORT` env var
- Default: `8000`
