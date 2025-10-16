import { test, expect } from '@playwright/test';
import { Login } from './pages/access_page';
import { faker } from '@faker-js/faker/locale/pt_BR';

test.describe("Listagem e criação de Usuários", () => {
    //transformar em fixtures.
    test.beforeEach(async ({page}) => {
        const loginPage = new Login(page);

        await loginPage.acessarPagina();
        await loginPage.acessoAdministrador();
    });

    test('Criação de usuários', async ({page}) => {
        const name = faker.person.firstName();
        const email = faker.internet.exampleEmail();
        const password = '123';

        //Inicio cadastro de usuário ja logado na plataforma
        await page.getByTestId('cadastrar-usuarios').click();

        await page.getByPlaceholder('Digite seu nome').fill(name);

        await page.getByPlaceholder('Digite seu email').fill(email);

        await page.getByPlaceholder('Digite sua senha').fill(password);

        await page.getByText(/^Cadastrar$/).click();

        await expect(page.getByText('Lista dos usuários')).toBeVisible();

        //Realizo o logout para aproveitar essa sessão e credenciais geradas dinamicamente pelo faker
        await page.getByText('Logout').click();

        const loginPage = new Login(page);

        await loginPage.login(email, password);

        await expect(page.getByText(/Serverest Store/)).toBeVisible();
        
    })
})