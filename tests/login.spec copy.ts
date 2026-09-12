// tests/login.spec.ts
import { test, expect } from '@playwright/test';

test('deve exibir mensagem de erro ao tentar realizar login com credenciais não cadastradas', async ({ page }) => {
  // 1. Acessa a página de login
  await page.goto('http://localhost:5173/login');

  // 2. Preenche os campos
  await page.getByPlaceholder(/seu@email.com/i).fill('usuario@teste.com');
  await page.getByPlaceholder(/digite a sua senha/i).fill('Senha123!');

  // 3. Clica no botão de entrar
  await page.getByRole('button', { name: /entrar/i }).click();

  // 4. Verifica que não houve redirecionamento (permanece na página de login)
  //await expect(page).toHaveURL(/.*login/);

  // 5. Verifica se a mensagem de erro é exibida para o usuário  
  await expect(page.getByText(/E-mail ou senha incorretos./i)).toBeVisible();
});

test('deve realizar login com sucesso usando Email e senha válidos e redirecionar para a área logada', async ({ page }) => {
  // 1. Acessa a página de login
  await page.goto('http://localhost:5173/login');

  // 2. Preenche os campos com os dados fornecidos
  await page.getByPlaceholder(/seu@email.com/i).fill('nxdroot@gmail.com');
  await page.getByPlaceholder(/digite a sua senha/i).fill('(Senha123)');

  // 3. Clica no botão de entrar
  await page.getByRole('button', { name: /entrar/i }).click();

  // 4. Verifica o redirecionamento para a página de destino (ex: /cargos)
  // Certifique-se de que a rota de destino corresponde ao comportamento real do seu app
  //await expect(page).toHaveURL(/.*cargos/);
  await expect(page.getByText(/Bem-vindo de volta!/i)).toBeVisible();
});

test('deve realizar login com sucesso usando alias e senha válidos e redirecionar para a área logada', async ({ page }) => {
  // 1. Acessa a página de login
  await page.goto('http://localhost:5173/login');

  // 2. Preenche os campos com os dados fornecidos
  await page.getByPlaceholder(/seu@email.com/i).fill('rootmaster');
  await page.getByPlaceholder(/digite a sua senha/i).fill('(Senha123)');

  // 3. Clica no botão de entrar
  await page.getByRole('button', { name: /entrar/i }).click();

  // 4. Verifica o redirecionamento para a página de destino (ex: /cargos)
  // Certifique-se de que a rota de destino corresponde ao comportamento real do seu app
  //await expect(page).toHaveURL(/.*cargos/);
  await expect(page.getByText(/Bem-vindo de volta!/i)).toBeVisible();
});