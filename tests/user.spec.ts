import { expect } from '@playwright/test';
import { LoginPage } from '../pages/access_page';
import { UserPage } from '../pages/user_page';
import { UserFactory } from '../factories/user_factory';
import { test } from '../fixtures/login_fixture';


test.describe("Criação de Usuários e listagem de usuário", () => {
    
    test('@P1 Usuario Comum', async ({page, adminLogin}) => {
        
        const userPage = new UserPage(page);
        const commonUser = new UserFactory().common();

        //Inicio cadastro de usuário
        await userPage.createUser(commonUser);

        //Realizo o logout para aproveitar essa sessão e credenciais geradas dinamicamente pelo faker
        await page.getByText('Logout').click();

        const loginPage = new LoginPage(page);

        await loginPage.login(commonUser);
        
    })

    test('@P1 Usuario Administrador e listagem', async ({page, adminLogin}) => {
        test.info().annotations.push({ type: 'priority', description: 'P1' });
        const userPage = new UserPage(page);
        const adminUser = new UserFactory().admin();

        //Inicio cadastro de usuário
        await userPage.createUser(adminUser);

        //Realizo o logout para aproveitar essa sessão e credenciais geradas dinamicamente pelo faker
        await page.getByText('Logout').click();

        const loginPage = new LoginPage(page);

        await loginPage.login(adminUser);

        await userPage.listUsers();
        
        const isUserListed = await userPage.foundUserInTable(adminUser);

        await expect(isUserListed).toBeTruthy();
    })
})