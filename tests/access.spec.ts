import { expect } from '@playwright/test';
import { UserFactory } from '../factories/user_factory';
import { LoginPage } from '../pages/access_page';
import { test } from '../fixtures/login_fixture';

const invalidLoginCases = [
  { name: 'com e-mail vazio', email: '', password: 'senha123', expected: 'Email é obrigatório' },
  { name: 'com senha vazia', email: 'gutocross.dx@gmail.com', password: '', expected: 'Password é obrigatório' },
];

test.describe('Cadastro', () => {
  
  test('Conta', async ({ page }) => {

    const adminUser = new UserFactory().admin();

    await expect(page).toHaveTitle("Front - ServeRest");

    await page.getByText("Cadastre-se").click();

    await page.getByPlaceholder("Digite seu nome").fill(adminUser.name);

    await page.getByPlaceholder("Digite seu email").fill(adminUser.email);

    await page.getByPlaceholder("Digite sua senha").fill(adminUser.password);

    await page.getByRole('checkbox', {name: 'administrador'}).check();

    await page.getByRole('button', {name: 'Cadastrar'}).click();

    await expect(page.getByText('Cadastro realizado com sucesso')).toBeVisible();

    await expect(page.getByText(/Bem Vindo/)).toBeVisible();

  });

});

test.describe('Login', () => {
  
  test('com sucesso', async ({ page, adminLogin }) => {
      await expect(page.getByText(/Bem Vindo/)).toBeVisible();
  });

  for (const testCase of invalidLoginCases){
    test(`${testCase.name}`, async ({ page }) => {

        await page.getByPlaceholder("Digite seu email").fill(testCase.email);

        await page.getByPlaceholder("Digite sua senha").fill(testCase.password);

        await page.getByText('Entrar').click();

        await expect(page.getByText(testCase.expected)).toBeVisible();
    });
  }

})
    

