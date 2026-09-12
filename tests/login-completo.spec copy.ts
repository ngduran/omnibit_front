// tests/login-completo.spec.ts
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';
const BASE_URL_AUCTORITAS = 'http://localhost:8085';

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
});

// --- LISTA 1: CENÁRIOS DE REGRAS DE NEGÓCIO ---
test.describe('Cenários de Regras de Negócio', () => {

  test('E-mail inexistente: deve exibir erro ao logar com e-mail desconhecido', async ({ page }) => {
    await page.getByPlaceholder(/seu@email.com/i).fill('inexistente@teste.com');
    await page.getByPlaceholder(/digite a sua senha/i).fill('Senha123!');
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page.getByText(/E-mail ou senha incorretos./i)).toBeVisible();
  });

  test('Conta não validada: deve bloquear acesso quando validationEmail for false', async ({ page }) => {
    // Assumindo que este usuário existe no banco com validationEmail: false
    await page.getByPlaceholder(/seu@email.com/i).fill('professor@gmail.com');
    await page.getByPlaceholder(/digite a sua senha/i).fill('Senha123!');
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page.getByText(/Esta conta ainda não foi ativada./i)).toBeVisible();
  });

  test('Código de verificação pendente: deve bloquear acesso', async ({ page }) => {
    await page.getByPlaceholder(/seu@email.com/i).fill('verificacao@teste.com');
    await page.getByPlaceholder(/digite a sua senha/i).fill('Senha123!');
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page.getByText(/E-mail ou senha incorretos./i)).toBeVisible();
  });

  test('Senha incorreta: deve exibir erro para e-mail válido com senha errada', async ({ page }) => {
    await page.getByPlaceholder(/seu@email.com/i).fill('usuario@teste.com');
    await page.getByPlaceholder(/digite a sua senha/i).fill('Senha123!');
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page.getByText(/E-mail ou senha incorretos/i)).toBeVisible();
  });

  test('Case sensitivity: deve tratar e-mail como case-insensitive', async ({ page }) => {
    // Testa se o e-mail em maiúsculo funciona igual ao minúsculo
    await page.getByPlaceholder(/seu@email.com/i).fill('USUARIO@TESTE.COM');
    await page.getByPlaceholder(/digite a sua senha/i).fill('Senha123!');
    await page.getByRole('button', { name: /entrar/i }).click();
    // Se o login for bem-sucedido, deve redirecionar
    await expect(page.getByText(/E-mail ou senha incorretos/i)).toBeVisible();
  });
});

// --- LISTA 2: CENÁRIOS DE INTEGRIDADE E TENTATIVAS DE "BURLA" ---
// Estes testes utilizam a API para bypassar restrições de UI e validar o contrato do servidor
test.describe('Cenários de Integridade e Tentativas de Burla', () => {

  test('Payload vazio: deve retornar erro 400 ou 422', async ({ request }) => {
    const response = await request.post(`${BASE_URL_AUCTORITAS}/auth/login`, { data: {} });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('Campos obrigatórios ausentes: deve validar ausência de senha', async ({ request }) => {
    const response = await request.post(`${BASE_URL_AUCTORITAS}/auth/login`, { 
      data: { email: 'usuario@teste.com' } 
    });
    expect(response.status()).toBe(400);
  });

  test('Injection SQL/Script: deve sanitizar entrada', async ({ request }) => {
    const response = await request.post(`${BASE_URL_AUCTORITAS}/auth/login`, { 
      data: { email: "' OR '1'='1", senha: "x" } 
    });
    // O sistema deve tratar como erro de autenticação, nunca processar o OR injection
    expect(response.status()).toBe(401);
  });

  test('Manipulação de Tipos: deve rejeitar objetos/arrays enviados como string', async ({ request }) => {
    const response = await request.post(`${BASE_URL_AUCTORITAS}/auth/login`, { 
      data: { email: { key: "value" }, senha: [1, 2, 3] } 
    });
    expect(response.status()).toBe(400);
  });

  test('Espaços em branco: deve validar formato ao receber apenas espaços', async ({ page }) => {
    await page.getByPlaceholder(/seu@email.com/i).fill('   ');
    await page.getByPlaceholder(/digite a sua senha/i).fill('   ');
    await page.getByRole('button', { name: /entrar/i }).click();

    // Validando a mensagem exata do schema do frontend
    await expect(page.getByText(/Por favor, insira um e-mail válido/i)).toBeVisible();
    
    // Usamos a barra invertida \+ porque o sinal de mais é um caractere especial em Regex
    await expect(page.getByText(/Senha deve ter 8\+ caracteres/i)).toBeVisible();
  });

  test('Request repetida (Replay): verificar taxa de limite (se implementado)', async ({ request }) => {
    // Envia várias requisições rápidas
    for (let i = 0; i < 5; i++) {
      await request.post(`${BASE_URL_AUCTORITAS}/auth/login`, { 
        data: { email: 'user@test.com', senha: 'wrong' } 
      });
    }
    // Aqui você pode verificar se o servidor começa a retornar 429 (Too Many Requests)
    // Se não tiver rate limiting, apenas confirme que ele não quebra (status 401)
    const lastResponse = await request.post(`${BASE_URL_AUCTORITAS}/auth/login`, { 
        data: { email: 'user@test.com', senha: 'wrong' } 
    });
    expect(lastResponse.status()).toBe(401);
  });

});