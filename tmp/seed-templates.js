/**
 * Script de seed para criar templates de teste no banco.
 * Execute com: node tmp/seed-templates.mjs
 */

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const TEMPLATES_LINKEDIN = [
  {
    name: 'Conexão Inicial - LinkedIn',
    channel: 'LINKEDIN',
    subject: null,
    body: `Olá {{firstName}}, tudo bem?

Vi que você atua como {{cargo}} na {{empresa}} e fiquei muito curioso sobre o trabalho que vocês fazem.

Posso adicionar você à minha rede? Adoraria trocar uma ideia sobre o setor.`,
  },
  {
    name: 'Follow-up após Conexão - LinkedIn',
    channel: 'LINKEDIN',
    subject: null,
    body: `Olá {{firstName}}, obrigado por aceitar minha conexão!

Fico feliz em expandir minha rede com profissionais da {{empresa}}.

Tenho trabalhado com soluções que podem agregar valor ao dia a dia de {{cargo}} como você. Posso te apresentar brevemente como funciona?`,
  },
  {
    name: 'Abordagem de Parceria - LinkedIn',
    channel: 'LINKEDIN',
    subject: null,
    body: `Olá {{firstName}}, vi seu perfil e precisei mandar uma mensagem.

O trabalho que você desenvolve na {{empresa}} se alinha diretamente com o que nossa solução propõe.

Tenho 15 minutos para uma conversa rápida essa semana? Tenho certeza que vai valer a pena.`,
  },
];

const TEMPLATES_EMAIL = [
  {
    name: 'Primeiro Contato - E-mail',
    channel: 'EMAIL',
    subject: 'Uma ideia que pode interessar à {{empresa}}',
    body: `Olá {{firstName}},

Meu nome é [Seu Nome] e entrei em contato porque vi que você é {{cargo}} na {{empresa}}.

Temos ajudado empresas do seu segmento a resolver [problema específico] de forma rápida e mensurável.

Posso te enviar mais detalhes? Basta responder esse e-mail e agendamos 20 minutos.

Abraços,
[Seu Nome]`,
  },
  {
    name: 'Follow-up de E-mail',
    channel: 'EMAIL',
    subject: 'Re: Uma ideia para {{empresa}}',
    body: `Olá {{firstName}},

Enviei um e-mail há alguns dias mas pode ter se perdido na caixa de entrada.

Queria só confirmar se faz sentido conversarmos sobre como [solução] pode ajudar a {{empresa}} com [resultado esperado].

Uma resposta rápida já ajuda muito!

Abraços,
[Seu Nome]`,
  },
  {
    name: 'Proposta de Valor - E-mail',
    channel: 'EMAIL',
    subject: 'Como a {{empresa}} pode alcançar [resultado] em 30 dias',
    body: `Olá {{firstName}},

Pesquisei sobre a {{empresa}} e identifiquei uma oportunidade clara para o time de {{cargo}}.

Empresas similares à sua conseguiram [resultado concreto] em menos de 30 dias usando nossa abordagem.

Posso te mostrar um case específico? Leva menos de 15 minutos e pode ser revelador para o contexto da {{empresa}}.

Disponível essa semana?

Abraços,
[Seu Nome]`,
  },
];

async function main() {
  try {
    // Busca o primeiro perfil disponível para associar os templates
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      console.error('❌ Nenhum perfil encontrado. Faça login no sistema primeiro.');
      process.exit(1);
    }

    console.log(`✅ Usando perfil: ${profile.email}`);

    let created = 0;
    let skipped = 0;

    const allTemplates = [...TEMPLATES_LINKEDIN, ...TEMPLATES_EMAIL];

    for (const tpl of allTemplates) {
      const existing = await prisma.template.findFirst({
        where: { profileId: profile.id, name: tpl.name },
      });

      if (existing) {
        console.log(`⚠️  Template já existe: "${tpl.name}" — pulando.`);
        skipped++;
        continue;
      }

      await prisma.template.create({
        data: {
          profileId: profile.id,
          name: tpl.name,
          channel: tpl.channel,
          subject: tpl.subject,
          body: tpl.body,
          isActive: true,
        },
      });

      console.log(`✅ Criado: "${tpl.name}" [${tpl.channel}]`);
      created++;
    }

    console.log(`\n📊 Resultado: ${created} criados, ${skipped} já existentes.`);
  } catch (error) {
    console.error('❌ Erro ao criar templates:', error);
  } finally {
    await prisma.$disconnect();
    pool.end();
  }
}

main();
