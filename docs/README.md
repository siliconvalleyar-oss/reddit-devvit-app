# trends-api

Reddit Devvit app — Template vibe-coding con React + Vite + Hono + tRPC + Tailwind.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | **React 19**, Tailwind CSS 4 |
| Backend | **Hono** (servidor HTTP), **tRPC** (RPC type-safe) |
| Build | **Vite 8**, TypeScript 6 |
| Tests | **Vitest** |
| Plataforma | **Devvit** (Reddit) |

## Estructura del proyecto

```
reddit-devvit-app/
├── website/                    # 🎯 App Devvit (React + Vite + Hono + tRPC)
│   ├── src/
│   │   ├── client/             # Frontend React (game.tsx, splash.tsx)
│   │   ├── server/             # Backend Hono (core/, routes/, trpc.ts)
│   │   └── shared/             # Tipos compartidos
│   ├── public/                 # Assets estáticos
│   └── tools/                  # TypeScript configs
├── tools/                      # ⚙️ Herramientas no-web
│   └── python/                 # 🐍 Servidor FastAPI (landing page + APIs)
│       ├── main.py
│       ├── routers/            # /api/reddit/*, /api/data/*
│       ├── static/             # Landing page assets
│       ├── js/                 # Landing page JS
│       └── templates/          # HTML templates
├── docs/                       # 📚 Documentación
│   ├── README.md
│   └── rules.md
├── trash/                      # 🗑️ Archivos viejos
└── .gitignore
```

## Inicio rápido (Devvit)

```bash
cd website
npm install
npm run dev          # Desarrollo en vivo en Reddit
npm run build        # Build para producción
npm run type-check   # TypeScript check
npm run test         # Tests con Vitest
npm run deploy       # Build + upload a Reddit
npm run launch       # Build + deploy + publish
```

## Servidor web Python (landing page + APIs)

```bash
cd tools/python
source .venv/bin/activate
pip install -r requirements.txt

# Iniciar servidor
python main.py                    # Puerto 8000
python main.py --port 8080        # Puerto custom
PORT=8080 python main.py
```

### Endpoints

- `GET /` — Landing page promocional
- `GET /health` — Health check
- `GET /api/reddit/trending` — Trending posts desde Reddit
- `GET /api/reddit/hot?subreddit=all` — Hot posts
- `GET /api/data/trends` — Trends desde MySQL
- `POST /api/data/contact` — Formulario de contacto

### Variables de entorno

Copiar `tools/python/.env.example` a `tools/python/.env` y configurar:

```env
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
REDDIT_USERNAME=lionar0373839
REDDIT_PASSWORD=...
DB_HOST=localhost
PORT=8000
```

## Comandos útiles

```bash
# Devvit CLI (autenticado como u/lionar0373839)
npx devvit whoami
cd website && npx devvit login
cd website && npx devvit playtest

# Tools
bash tools/dev.sh                 # Menú interactivo
```
