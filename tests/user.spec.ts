import { test, expect } from '@playwright/test';
import { Login } from '../pages/access_page';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { UserPage } from '../pages/user_page';
import { UserFactory } from '../factories/user_factory';

const adminUser = new UserFactory().admin();
const commonUser = new UserFactory().common();


//transformar em fixtures.
test.beforeEach(async ({page}) => {
        const loginPage = new Login(page);

        await loginPage.acessarPagina();
        await loginPage.acessoAdministrador();
    });

test.describe("Criação de Usuários", () => {
    
    test('Usuario Comum', async ({page}) => {
        const userPage = new UserPage(page);

        //Inicio cadastro de usuário
        await userPage.createUser(commonUser);

        //Realizo o logout para aproveitar essa sessão e credenciais geradas dinamicamente pelo faker
        await page.getByText('Logout').click();

        const loginPage = new Login(page);

        await loginPage.login(commonUser.email, commonUser.password);

        await expect(page.getByText(/Serverest Store/)).toBeVisible();
        
    })

    test('Usuario Administrador', async ({page}) => {
        const userPage = new UserPage(page);

        //Inicio cadastro de usuário
        await userPage.createUser(adminUser);

        //Realizo o logout para aproveitar essa sessão e credenciais geradas dinamicamente pelo faker
        await page.getByText('Logout').click();

        const loginPage = new Login(page);

        await loginPage.login(adminUser.email, adminUser.password);

        await expect(page.getByText(/Bem Vindo/)).toBeVisible();
        
    })
})

test.describe("Listagem de usuários", () => {
    
    

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