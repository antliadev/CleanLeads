# Script de Configuracao Completa do Projeto Network Commercial Automation
Write-Host "[*] Iniciando configuracao do ambiente..." -ForegroundColor Cyan

# 1. Subir Infraestrutura (Docker)
Write-Host "[1/4] Subindo containers (PostgreSQL + Redis)..." -ForegroundColor Yellow
docker-compose up -d

# Esperar DB subir
Write-Host "[...] Aguardando banco de dados estabilizar..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# 2. Instalar Dependencias das Apps
Write-Host "[2/4] Instalando dependencias do Backend (API)..." -ForegroundColor Yellow
cd apps/api
npm install
cd ../..

Write-Host "[2/4] Instalando dependencias do Frontend (Web)..." -ForegroundColor Yellow
cd apps/web
npm install
cd ../..

# 3. Preparar Banco de Dados (Prisma)
Write-Host "[3/4] Configurando Schema e Client do Prisma..." -ForegroundColor Yellow
npx prisma generate
npx prisma migrate dev --name init

# 4. Rodar Seed (Admin Inicial)
Write-Host "[4/4] Populando banco de dados com usuario admin..." -ForegroundColor Yellow
npx ts-node prisma/seed.ts

Write-Host ""
Write-Host "[OK] CONFIGURACAO CONCLUIDA!" -ForegroundColor Green
Write-Host "----------------------------------------------------"
Write-Host "Para rodar as aplicacoes, use os comandos abaixo em terminais separados:"
Write-Host ""
Write-Host "BACKEND (API): cd apps/api; npm run dev" -ForegroundColor Indigo
Write-Host "FRONTEND (WEB): cd apps/web; npm run dev" -ForegroundColor Indigo
Write-Host "----------------------------------------------------"
Write-Host "Acesso Inicial:"
Write-Host "URL: http://localhost:3001"
Write-Host "Login: admin@network.com.br"
Write-Host "Senha: admin123"
Write-Host "----------------------------------------------------"
