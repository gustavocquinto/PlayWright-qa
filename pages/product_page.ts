import { Locator, Page, expect } from "@playwright/test";
import path from "path";
import { Product } from "../models/product_model";

export class ProductPage {
    
    public productPage: Page;

    constructor(page: Page){
        this.productPage = page;
    }

    async createProduct(product: Product){
        const imageDir = '/assets/'
        await this.productPage.getByPlaceholder('Digite o nome do produto').fill(product.name);

        await this.productPage.getByPlaceholder('Digite o valor do produto').fill(product.price);

        await this.productPage.getByPlaceholder('Digite a descrição do produto').fill(product.description);

        await this.productPage.getByPlaceholder('Digite aquantidade do produto').fill(product.quantity);

        await this.productPage.getByTestId('imagem').setInputFiles(`../PlayWright-qa/assets/${product.image}`);

        await this.productPage.getByTestId('cadastarProdutos').click();
    }

    async list(): Promise<void>{

        try{
            await expect(this.productPage.getByText('Lista dos Produtos')).toBeVisible();
            await this.productPage.waitForSelector('table tbody tr', {state: 'visible'});
        }
        catch{
            throw new Error("Erro ao carregar a tela de listagem de produtos");
        }

    }

    private async getFirstRowOfTable(): Promise<Locator>{
        return await this.productPage.locator('table tbody tr').first();
    }

    async getFirstProductData(): Promise<Product>{
        const product = new Product();

        const columns = await (await this.getFirstRowOfTable()).locator('td').all();

        product.name = await columns[0].innerText();
        product.price = await columns[1].innerText();
        product.description = await columns[2].innerText();
        product.quantity = await columns[3].innerText();

        return product
    }

    async deleteFirstProduct(): Promise<void>{
        return await (await this.getFirstRowOfTable()).getByRole('button', {name: 'Excluir'}).click();
    }

    async findProductInList(product: Product): Promise<boolean>{
        const tableRows = await this.getTableRows();
        for(const row of await tableRows){

            const cols = await row.locator('td').all();
            const savedProductName = await cols[0].innerText();
            const savedProductPrice = await cols[1].innerText();
            const savedProductDescription = await cols[2].innerText();
            const savedProductQuantity = await cols[3].innerText();

            if(savedProductName == product.name && 
                savedProductPrice == product.price &&
                savedProductDescription == product.description &&
                savedProductQuantity == product.quantity
            ){
                return true;
            }
        }
        return false;
    }

    async getTableRows(): Promise<Locator[]>{
        return await this.productPage.locator('table tbody tr').all();
    }
}