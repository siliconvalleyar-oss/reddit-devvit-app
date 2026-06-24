# Rules — trends-api

## Project structure

- `website/` — App Devvit (React + Vite + Hono + tRPC + Tailwind)
- `tools/` — Herramientas Python, scripts .sh, ejecutables no-web
- `docs/` — Documentación en Markdown
- `trash/` — Archivos viejos/obsoletos (no eliminar, mover acá)

## Code conventions

### TypeScript / React (website/)
- **React 19** con componentes funcionales y hooks
- **TypeScript strict mode** siempre
- **tRPC** para comunicación cliente-servidor type-safe
- **Hono** para rutas del servidor
- **Tailwind CSS 4** para estilos (utilizar `clsx` + `tailwind-merge`)
- Tests con **Vitest**
- Linting con **ESLint** + **Prettier**

### Python (tools/python/)
- Type hints (`from __future__ import annotations`)
- **FastAPI** para el servidor web
- **PRAW** para API de Reddit
- Variables de entorno vía `python-dotenv`
- MySQL con `mysql-connector-python`
- Usar virtual env (`.venv/`)

### Build
- Devvit: **Vite 8** (`vite build`)
- Servidor Python: **uvicorn**

## Git
- Commits en español o inglés
- Prefijos: `feat:`, `fix:`, `chore:`, `docs:`, `tools:`
- No committear: `node_modules/`, `dist/`, `.env`, `*.zip`, `.venv/`

## Servidor Python
```bash
cd tools/python
source .venv/bin/activate
python main.py                    # Puerto 8000
python main.py --port 8080        # Puerto custom
```
