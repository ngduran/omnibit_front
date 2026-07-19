// scripts/data-seed.ts
import fetch from 'node-fetch'; // Certifique-se de ter instalado: npm install node-fetch

const API_URL = 'http://localhost:8080/api/test'; // Ajuste conforme seu endpoint de setup

const users = [
  { email: 'usuario@teste.com', senha: 'Senha123!', validationEmail: true, verificationCode: null },
  { email: 'pendente@teste.com', senha: 'Senha123!', validationEmail: false, verificationCode: null },
  { email: 'verificacao@teste.com', senha: 'Senha123!', validationEmail: true, verificationCode: '123456' }
];

async function seed() {
  console.log('Iniciando o seeding de dados...');
  for (const user of users) {
    const response = await fetch(`${API_URL}/create-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    
    if (response.ok) {
      console.log(`Usuário ${user.email} criado com sucesso.`);
    } else {
      console.error(`Erro ao criar ${user.email}: ${await response.text()}`);
    }
  }
}

seed();