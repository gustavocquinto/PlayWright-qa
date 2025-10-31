import { Locator, Page, expect } from "@playwright/test";
import { Product } from "../models/product_model.js";

export class ProductPage {
    
    public page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async createProduct(product: Product){
        const imageDir = '/assets/'
        await this.page.getByPlaceholder('Digite o nome do produto').fill(product.name);

        await this.page.getByPlaceholder('Digite o valor do produto').fill(product.price);

        await this.page.getByPlaceholder('Digite a descrição do produto').fill(product.description);

        await this.page.getByPlaceholder('Digite aquantidade do produto').fill(product.quantity);

        await this.page.getByTestId('cadastarProdutos').click();
    }

    async list(): Promise<void>{

        try{
            await expect(this.page.getByText('Lista dos Produtos')).toBeVisible();
            await this.page.waitForSelector('table tbody tr', {state: 'visible'});
        }
        catch{
            throw new Error("Erro ao carregar a tela de listagem de produtos");
        }

    }

    private async getRowOfTable(row: number): Promise<Locator>{
        return await this.page.locator('table tbody tr').nth(row)
    }

    async getProductData(row: number = 0): Promise<Product>{
        const product = new Product();

        const columns = await (await this.getRowOfTable(row)).locator('td').all();

        product.name = await columns[0]!.innerText();
        product.price = await columns[1]!.innerText();
        product.description = await columns[2]!.innerText();
        product.quantity = await columns[3]!.innerText();

        return product
    }

    async deleteProduct(row: number = 0): Promise<void>{
        return await (await this.getRowOfTable(row)).getByRole('button', {name: 'Excluir'}).click();
    }

    async findProductInList(product: Product): Promise<boolean>{
        const tableRows = await this.getTableRows();
        for(const row of await tableRows){

            const cols = await row.locator('td').all();
            const savedProductName = await cols[0]!.innerText();
            const savedProductPrice = await cols[1]!.innerText();
            const savedProductDescription = await cols[2]!.innerText();
            const savedProductQuantity = await cols[3]!.innerText();

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
        return await this.page.locator('table tbody tr').all();
    }
}