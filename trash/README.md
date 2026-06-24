# reddit-devvit-app

App interactiva para Reddit construida con [Devvit](https://developers.reddit.com/) — la plataforma de desarrollo de Reddit.

Esta app agrega un **post personalizado con un contador interactivo** que los usuarios pueden incrementar/decrementar. Los datos persisten por post vía Redis.

---

## Estructura del proyecto

```
src/
├── client/          # Código frontend (navegador)
│   ├── splash.ts    # Pantalla de bienvenida con botón "Start"
│   └── game.ts      # Contador interactivo (+ / -)
├── server/          # Backend Node.js que corre en Reddit
│   ├── index.ts     # Servidor HTTP entrypoint
│   └── server.ts    # Rutas y lógica de negocio
└── shared/
    └── api.ts       # Tipos compartidos entre cliente y servidor

tools/
├── build.ts         # Script de build con esbuild
├── tsconfig.base.json       # Config base TypeScript
├── tsconfig.client.json     # Config para cliente (browser)
├── tsconfig.server.json     # Config para servidor (Node)
└── tsconfig.shared.json     # Config para tipos compartidos

public/
├── splash.html      # HTML de la pantalla de bienvenida
├── game.html        # HTML del contador interactivo
├── splash.css       # Estilos de bienvenida
├── game.css         # Estilos del contador
└── snoo.png         # Mascota de Reddit

devvit.json          # Configuración de la app en Reddit
```

---

## Flujo de la app

1. Un moderador usa el menú **"Create a new post"** para crear un post con esta app.
2. Los usuarios ven la **pantalla de bienvenida** (splash) con un botón "Start".
3. Al hacer clic en "Start", se expande al **modo juego** con un contador.
4. Los usuarios pueden presionar **+** o **-** para cambiar el contador.
5. Cada clic envía una solicitud al **servidor**, que actualiza el valor en Redis.
6. El contador se actualiza en tiempo real para todos los que ven el post.

---

## API endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/init` | GET | Obtiene el valor inicial del contador y el usuario |
| `/api/increment` | POST | Incrementa el contador (`{ "amount": 1 }`) |
| `/api/decrement` | POST | Decrementa el contador (`{ "amount": 1 }`) |
| `/internal/menu/post-create` | - | Crea un nuevo post (menú de moderador) |
| `/internal/on-app-install` | - | Crea un post inicial al instalar la app |

---

## Requisitos

- **Node.js >= 22.6.0** (definido en `.nvmrc`)
- Cuenta de Reddit registrada en [developers.reddit.com](https://developers.reddit.com)

---

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar sesión en Reddit Developers
npx devvit login

# 3. Playtest en subreddit de prueba
npx devvit playtest

# 4. Construir para producción
npm run build

# 5. Subir nueva versión
npm run deploy

# 6. Publicar (requiere revisión de Reddit)
npm run launch
```

O usa el menú interactivo:

```bash
./dev.sh
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Playtest en vivo en subreddit de prueba |
| `npm run build` | Compila cliente y servidor con esbuild |
| `npm run deploy` | Build + upload a Reddit |
| `npm run launch` | Build + deploy + publish |
| `npm run login` | Iniciar sesión en Reddit Developers |
| `npm run type-check` | Verificar tipos TypeScript |

---

## Tecnologías

- **[Devvit](https://developers.reddit.com/)** — Framework de Reddit para apps embebidas
- **[TypeScript](https://www.typescriptlang.org/)** — Tipado estático estricto
- **[esbuild](https://esbuild.github.io/)** — Bundler rápido para cliente y servidor
- **[Redis](https://redis.com/)** — Persistencia del contador por post (provisto por Devvit)

---

## Licencia

BSD 3-Clause — Copyright (c) 2025 Reddit Inc.
