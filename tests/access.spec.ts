import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';
import { Login } from './pages/access_page';

const invalidLoginCases = [
  { name: 'E-mail vazio', email: '', password: 'senha123', expected: 'Email é obrigatório' },
  { name: 'Senha vazia', email: 'gutocross.dx@gmail.com', password: '', expected: 'Password é obrigatório' },
];

//transformar em fixtures.
test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page)

    await loginPage.acessarPagina();
});

test.describe('Cadastro e login na plataforma', () => {
  

  test('Cadastro de conta', async ({ page }) => {

    let randomEmail= randomInt(999);

    await expect(page).toHaveTitle("Front - ServeRest");

    await page.getByText("Cadastre-se").click();

    await page.getByPlaceholder("Digite seu nome").fill("Tester QA 1");

    await page.getByPlaceholder("Digite seu email").fill(`gutocross.dx${randomEmail}@gmail.com`);

    await page.getByPlaceholder("Digite sua senha").fill("Senha@Forte123");

    await page.getByRole('checkbox', {name: 'administrador'}).check();

    await page.getByRole('button', {name: 'Cadastrar'}).click();

    await expect(page.getByText('Cadastro realizado com sucesso')).toBeVisible();

    await expect(page.getByText(/Bem Vindo/)).toBeVisible();

  });

  test('Acesso com cadastro recém criado', async ({ page }) => {
    const loginPage = new Login(page)
   
    await loginPage.acessoAdministrador();

    await expect(page.getByText(/Bem Vindo/)).toBeVisible();

  });
});

test.describe('Login com credenciais inválidas', () => {
    for (const testCase of invalidLoginCases){
    test(`${testCase.name}`, async ({ page }) => {

        await page.getByPlaceholder("Digite seu email").fill(testCase.email);

        await page.getByPlaceholder("Digite sua senha").fill(testCase.password);

        await page.getByText('Entrar').click();

        await expect(page.getByText(testCase.expected)).toBeVisible();
    });
  }

});