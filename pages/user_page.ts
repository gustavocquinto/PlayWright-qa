import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { User } from '../models/user_model';


export class UserPage {

    public userPage: Page;

    constructor(page: Page){
        this.userPage = page;
    }

    async createUser(user: User): Promise<void>{

        await this.userPage.getByTestId('cadastrar-usuarios').click();

        await this.userPage.getByPlaceholder('Digite seu nome').fill(user.name);

        await this.userPage.getByPlaceholder('Digite seu email').fill(user.email);

        await this.userPage.getByPlaceholder('Digite sua senha').fill(user.password);

        if (user.role == 'admin'){
            await this.userPage.getByRole('checkbox', {name: 'administrador'}).check();
        }

        await this.userPage.getByText(/^Cadastrar$/).click();

        await expect(this.userPage.getByText('Lista dos usuários')).toBeVisible();
    }
}