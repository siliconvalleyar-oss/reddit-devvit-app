#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

menu() {
    echo ""
    echo "=============================="
    echo "  my-client-bare (Devvit App)"
    echo "=============================="
    echo " 1) Instalar dependencias"
    echo " 2) Iniciar sesion en Reddit"
    echo " 3) Playtest (dev)"
    echo " 4) Build"
    echo " 5) Deploy (build + upload)"
    echo " 6) Launch (build + deploy + publish)"
    echo " 7) Type-check"
    echo " 0) Salir"
    echo "------------------------------"
    read -rp "Opcion: " opt
    echo ""
    case $opt in
        1)
            echo ">>> Instalando dependencias..."
            npm install
            menu
            ;;
        2)
            echo ">>> Iniciando sesion en Reddit..."
            npx devvit login
            menu
            ;;
        3)
            echo ">>> Playtest..."
            npx devvit playtest
            menu
            ;;
        4)
            echo ">>> Building..."
            npm run build
            menu
            ;;
        5)
            echo ">>> Deploying..."
            npm run deploy
            menu
            ;;
        6)
            echo ">>> Launching..."
            npm run launch
            menu
            ;;
        7)
            echo ">>> Type-check..."
            npm run type-check
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
    setup)     npm install && npx devvit login ;;
    dev)       npx devvit playtest ;;
    build)     npm run build ;;
    deploy)    npm run deploy ;;
    launch)    npm run launch ;;
    typecheck) npm run type-check ;;
    *)         menu ;;
esac
