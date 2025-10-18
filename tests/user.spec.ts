import { test, expect } from '@playwright/test';
import { Login } from '../pages/access_page';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { UserPage } from '../pages/user_page';
import { UserFactory } from '../factories/user_factory';
import { time } from 'console';


//transformar em fixtures.
test.beforeEach(async ({page}) => {
        const loginPage = new Login(page);

        await loginPage.acessarPagina();
        await loginPage.acessoAdministrador();
    });

test.describe("Criação de Usuários e listagem de usuário", () => {
    
    test('Usuario Comum', async ({page}) => {
        const userPage = new UserPage(page);
        const commonUser = new UserFactory().common();

        //Inicio cadastro de usuário
        await userPage.createUser(commonUser);

        //Realizo o logout para aproveitar essa sessão e credenciais geradas dinamicamente pelo faker
        await page.getByText('Logout').click();

        const loginPage = new Login(page);

        await loginPage.login(commonUser.email, commonUser.password);

        await expect(page.getByText(/Serverest Store/)).toBeVisible();
        
    })

    test('Usuario Administrador e listagem', async ({page}) => {
        const userPage = new UserPage(page);
        const adminUser = new UserFactory().admin();

        //Inicio cadastro de usuário
        await userPage.createUser(adminUser);

        //Realizo o logout para aproveitar essa sessão e credenciais geradas dinamicamente pelo faker
        await page.getByText('Logout').click();

        const loginPage = new Login(page);

        await loginPage.login(adminUser.email, adminUser.password);

        await expect(page.getByText(/Bem Vindo/)).toBeVisible();

        await page.getByTestId('listar-usuarios').click();

        await page.getByText('Lista dos usuários');

        const tabela = await page.locator('table tbody');

        await page.waitForSelector('table tbody tr', { state: 'visible' });
        let encontrado = false;

        for (const row of await tabela.locator('tr').all()){
            const colunas = await row.locator('td').all();
            const nome = await colunas[0].innerText();
            const email = await colunas[1].innerText();
            const senha = await colunas[2].innerText();
            
            if (nome == adminUser.name && email == adminUser.email && senha == adminUser.password){
                console.log('Nome: ' + nome + ' email: ' + email + ' senha: ' + senha);
                encontrado = true;
                break;
            }     
        }
        expect(encontrado).toBeTruthy(); 
    })
})