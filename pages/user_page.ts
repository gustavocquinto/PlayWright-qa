import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { User } from '../models/user_model';


export class UserPage {

    public page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async createUser(user: User): Promise<void>{

        await this.page.getByTestId('cadastrar-usuarios').click();

        await this.page.getByPlaceholder('Digite seu nome').fill(user.name);

        await this.page.getByPlaceholder('Digite seu email').fill(user.email);

        await this.page.getByPlaceholder('Digite sua senha').fill(user.password);

        if (user.role == 'admin'){
            await this.page.getByRole('checkbox', {name: 'administrador'}).check();
        }

        await this.page.getByText(/^Cadastrar$/).click();

        await expect(this.page.getByText('Lista dos usuários')).toBeVisible();
    }

    async listUsers(): Promise<void>{
        await this.page.getByTestId('listar-usuarios').click();
        await this.page.getByText('Lista dos usuários');
        await this.page.waitForSelector('table tbody tr', { state: 'visible' });
    }

    async foundUserInTable(user: User): Promise<boolean>{
        const tableRows = await this.page.locator('table tbody');
        const userIsAdmin = (user.role == 'admin') ? 'true' : 'false'; 

        for (const row of await tableRows.locator('tr').all()){
            const columns = await row.locator('td').all();
            const colName = await columns[0].innerText();
            const colEmail = await columns[1].innerText();
            const colSenha = await columns[2].innerText();
            const colIsAdminRole = await columns[3].innerText();

            if(colName == user.name && colEmail == user.email && colSenha == user.password && colIsAdminRole == userIsAdmin){
                return true
            }
        }
        return false
    }

}