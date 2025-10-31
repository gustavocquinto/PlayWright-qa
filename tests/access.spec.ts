import { expect } from '@playwright/test';
import { UserFactory } from '../factories/user_factory.js';
import { LoginPage } from '../pages/access_page.js';
import { test } from '../fixtures/login_fixture.js';

const invalidLoginCases = [
  { name: 'com e-mail vazio', email: '', password: 'senha123', expected: 'Email é obrigatório' },
  { name: 'com senha vazia', email: 'gutocross.dx@gmail.com', password: '', expected: 'Password é obrigatório' },
];

test.describe('Cadastro', () => {
  
  test('@P1 Conta', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });
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
  
  test('@P1 com sucesso', async ({ page, adminLogin }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });
      await expect(page.getByText(/Bem Vindo/)).toBeVisible();
  });

  for (const testCase of invalidLoginCases){
    test(`@P1 ${testCase.name}`, async ({ page }) => {
        await page.getByPlaceholder("Digite seu email").fill(testCase.email);

        await page.getByPlaceholder("Digite sua senha").fill(testCase.password);

        await page.getByText('Entrar').click();

        await expect(page.getByText(testCase.expected)).toBeVisible();
    });
  }

})

test.describe('Permissoes', () => {
  
  test('@P1 Administrador', async ({ page, adminLogin }) => {
     
  });

})


    

