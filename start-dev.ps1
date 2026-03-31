# Script de Inicialização Unificada - Network Automation
# Este script inicia o Frontend e o Backend simultaneamente em um sinalizador único.

Write-Host "🚀 Iniciando Ecossistema Network (Frontend + Backend + Automação)..." -ForegroundColor Cyan

# 1. Garantir Infraestrutura (Opcional, se o usuário tiver Docker)
Write-Host "[1/2] Verificando Docker (Postgres + Redis)..." -ForegroundColor Yellow
docker-compose up -d

# 2. Iniciar o projeto unificado
Write-Host "[2/2] Iniciando processos orquestrados (Concurrently)..." -ForegroundColor Green
Write-Host "Aguarde os logs de inicialização abaixo..." -ForegroundColor Gray
npm run dev
