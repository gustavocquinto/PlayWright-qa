import { Page, test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { User } from '../models/user_model';


export class LoginPage{
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

    async login(user: User): Promise <void> {
        await this.page.getByPlaceholder("Digite seu email").fill(user.email);
        
        await this.page.getByPlaceholder("Digite sua senha").fill(user.password);
        
        await this.page.getByText("Entrar").click();    

        if (user.role == 'admin'){
            await expect(this.page.getByText(/Bem Vindo/)).toBeVisible();
        }
        else{
            await expect(this.page.getByText(/Serverest Store/)).toBeVisible();
        }
    }

    async permissionsCheckAdmin(): Promise<void>{
        const adminPermissions = ["cadastrar-usuarios", "listar-usuarios", "cadastrar-produtos", "listar-produtos", "link-relatorios"];

        for(const permission of adminPermissions){
            const element = await this.page.getByTestId(permission);
            
            const isVisible = await element.isVisible();

            if(!isVisible){
                throw new Error("Elemento não clicável para Role Admin");
            }
        }
    }
}