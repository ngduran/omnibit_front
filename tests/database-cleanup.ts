// scripts/database-cleanup.ts
import fetch from 'node-fetch';

const API_URL = 'http://localhost:8080/api/test'; // Ajuste conforme seu endpoint de cleanup

const emailsToDelete = [
  'usuario@teste.com',
  'pendente@teste.com',
  'verificacao@teste.com'
];

async function cleanup() {
  console.log('Limpando banco de dados...');
  for (const email of emailsToDelete) {
    const response = await fetch(`${API_URL}/delete-user`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      console.log(`Usuário ${email} removido.`);
    } else {
      console.error(`Erro ao remover ${email}.`);
    }
  }
}

cleanup();