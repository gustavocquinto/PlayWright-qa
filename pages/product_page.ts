import { Page } from "@playwright/test";
import path from "path";

export class ProductPage {
    
    public ProductPage: Page;

    constructor(page: Page){
        this.ProductPage = page;
    }

    async createProduct(name: string, price: string, description: string, quantity: string, imageName: string){
        const imageDir = '/assets/'
        await this.ProductPage.getByPlaceholder('Digite o nome do produto').fill(name);

        await this.ProductPage.getByPlaceholder('Digite o valor do produto').fill(price);

        await this.ProductPage.getByPlaceholder('Digite a descrição do produto').fill(description);

        await this.ProductPage.getByPlaceholder('Digite aquantidade do produto').fill(quantity);

        await this.ProductPage.getByTestId('imagem').setInputFiles(`../PlayWright-qa/assets/${imageName}`);

        await this.ProductPage.getByTestId('cadastarProdutos').click();
    }
}