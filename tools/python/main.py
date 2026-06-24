#!/usr/bin/env python3
"""FastAPI web server for the my-client-bare landing page + APIs.

Usage:
    python main.py
    python main.py --port 8080
    PORT=8080 python main.py
"""

import argparse
import os
from pathlib import Path

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from routers import data as data_router
from routers import reddit as reddit_router

HERE = Path(__file__).parent

app = FastAPI(
    title="my-client-bare",
    description="Landing page promocional para la app de Reddit my-client-bare + APIs",
    version="0.3.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=HERE / "static"), name="static")
app.mount("/js", StaticFiles(directory=HERE / "js"), name="js")

app.include_router(reddit_router.router)
app.include_router(data_router.router)


@app.get("/")
async def index():
    return FileResponse(HERE / "templates" / "index.html")


@app.get("/health")
async def health():
    return {"status": "ok"}


def get_port() -> int:
    parser = argparse.ArgumentParser(description="my-client-bare server")
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.getenv("PORT", "8000")),
        help="Port to run the server on (default: 8000, env: PORT)",
    )
    args, _ = parser.parse_known_args()
    return args.port


if __name__ == "__main__":
    port = get_port()
    print(f"🚀 Starting server on http://0.0.0.0:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
