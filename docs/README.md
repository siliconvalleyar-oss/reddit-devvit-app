# my-client-bare

Reddit Devvit app — Contador interactivo dentro de Reddit.

## Estructura del proyecto

```
reddit-devvit-app/
├── website/           # Web app Devvit (TypeScript)
│   ├── src/
│   │   ├── client/    # Frontend (splash.ts, game.ts)
│   │   ├── server/    # Backend (server.ts, index.ts)
│   │   └── shared/    # Shared types (api.ts)
│   ├── public/        # Static assets (HTML, CSS, images)
│   └── tools/         # Build & TypeScript configs
├── tools/             # Herramientas no-web
│   └── python/        # Servidor web Python (FastAPI)
│       ├── main.py           # Entry point
│       ├── routers/          # API routes
│       ├── static/           # Landing page assets
│       ├── js/               # Landing page JS
│       └── templates/        # HTML templates
├── docs/              # Documentación
│   ├── README.md
│   └── rules.md
└── .gitignore
```

## Inicio rápido (Devvit)

```bash
cd website
npm install
npm run build
```

## Servidor web Python

El servidor FastAPI sirve la landing page promocional y APIs de Reddit.

```bash
cd tools/python
pip install -r requirements.txt

# Puerto por defecto (8000)
python main.py

# Puerto custom
python main.py --port 8080
PORT=8080 python main.py
```

### Endpoints

- `GET /` — Landing page
- `GET /health` — Health check
- `GET /api/reddit/trending` — Trending posts
- `GET /api/reddit/hot?subreddit=all` — Hot posts
- `GET /api/data/trends` — Trends desde MySQL
- `POST /api/data/contact` — Formulario de contacto

### Variables de entorno

Copiar `tools/python/.env.example` a `tools/python/.env` y configurar:

```
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
DB_HOST=localhost
PORT=8000
```
