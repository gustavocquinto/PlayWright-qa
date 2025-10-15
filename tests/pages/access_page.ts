import { Page, test, expect } from '@playwright/test';
import dotenv from 'dotenv';


export class Login{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        dotenv.config(); 
    }

    async acessar_pagina(){
        await this.page.goto(process.env.TEST_BASE_URL!);
    }

    async logar(){
        await this.page.getByPlaceholder("Digite seu email").fill(process.env.TEST_USER_LOGIN!);
        
        await this.page.getByPlaceholder("Digite sua senha").fill(process.env.TEST_USER_PASSWORD!);
        
        await this.page.getByText("Entrar").click();
    }
}