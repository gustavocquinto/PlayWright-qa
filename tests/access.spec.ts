import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';
import { Login } from '../pages/access_page';
import { UserFactory } from '../factories/user_factory';

const invalidLoginCases = [
  { name: 'com e-mail vazio', email: '', password: 'senha123', expected: 'Email é obrigatório' },
  { name: 'com senha vazia', email: 'gutocross.dx@gmail.com', password: '', expected: 'Password é obrigatório' },
];

//transformar em fixtures.
test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page)

    await loginPage.acessarPagina();
});

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
  
  test('com sucesso', async ({ page }) => {
    const loginPage = new Login(page);

    await loginPage.acessoAdministrador();

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
    

