#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

menu() {
    echo ""
    echo "=============================="
    echo "  my-client-bare (Devvit App)"
    echo "=============================="
    echo " 1) Instalar dependencias (website/)"
    echo " 2) Iniciar sesion en Reddit"
    echo " 3) Playtest (dev)"
    echo " 4) Build website"
    echo " 5) Type-check website"
    echo " 6) Servidor Python (tools/python/)"
    echo " 7) Instalar dependencias Python"
    echo " 0) Salir"
    echo "------------------------------"
    read -rp "Opcion: " opt
    echo ""
    case $opt in
        1)
            echo ">>> Instalando dependencias..."
            cd website && npm install && cd ..
            menu
            ;;
        2)
            echo ">>> Iniciando sesion en Reddit..."
            cd website && npx devvit login && cd ..
            menu
            ;;
        3)
            echo ">>> Playtest..."
            cd website && npx devvit playtest && cd ..
            menu
            ;;
        4)
            echo ">>> Building website..."
            cd website && npm run build && cd ..
            menu
            ;;
        5)
            echo ">>> Type-check..."
            cd website && npm run type-check && cd ..
            menu
            ;;
        6)
            echo ">>> Iniciando servidor Python..."
            cd tools/python && python main.py
            menu
            ;;
        7)
            echo ">>> Instalando dependencias Python..."
            cd tools/python && pip install -r requirements.txt && cd ../..
            menu
            ;;
        0) exit 0 ;;
        *)
            echo "Opcion invalida"
            menu
            ;;
    esac
}

case "${1:-}" in
    setup)     cd website && npm install && cd .. && cd tools/python && pip install -r requirements.txt && cd ../.. ;;
    dev)       cd website && npx devvit playtest ;;
    build)     cd website && npm run build ;;
    typecheck) cd website && npm run type-check ;;
    python)    cd tools/python && python main.py ;;
    *)         menu ;;
esac
