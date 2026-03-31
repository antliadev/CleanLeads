const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@network.com.br';
  const password = 'admin123';
  
  console.log('--- Iniciando Seed Simplificado ---');
  
  // Limpar usuários anteriores com mesmo e-mail para evitar conflito
  await prisma.user.deleteMany({ where: { email } });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      name: 'Administrador Elite',
      email: email,
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`✅ Sucesso! Usuário criado: ${user.email}`);
  console.log('Agora você pode fazer o login no Dashboard.');
}

main()
  .catch((e) => {
    console.error('❌ Erro no Seed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
