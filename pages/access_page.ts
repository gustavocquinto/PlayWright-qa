import { Page, test, expect } from '@playwright/test';
import dotenv from 'dotenv';


export class Login{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        dotenv.config(); 
    }

    async acessarPagina(){
        await this.page.goto(process.env.TEST_BASE_URL!);
    }

    async acessoAdministrador(): Promise <void> {
        await this.page.getByPlaceholder("Digite seu email").fill(process.env.TEST_USER_LOGIN!);
        
        await this.page.getByPlaceholder("Digite sua senha").fill(process.env.TEST_USER_PASSWORD!);
        
        await this.page.getByText("Entrar").click();

        try{
            await expect(this.page.getByText(/Bem Vindo/)).toBeVisible();
        }
        catch(error: unknown){
            
            if (error instanceof Error){
                await console.error('Ocorreu um erro ao realizar o login: ', error.message);
            }
            else {
                await console.error('Erro desconhecido ao tentar realizar o login', error);
            }
            
            throw new Error('Falha no login. Verifique as credenciais.')
        }
           
    }

    async login(email: string, senha: string): Promise <void> {
        await this.page.getByPlaceholder("Digite seu email").fill(email);
        
        await this.page.getByPlaceholder("Digite sua senha").fill(senha);
        
        await this.page.getByText("Entrar").click();    
    }
}