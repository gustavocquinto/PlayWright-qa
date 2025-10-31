import { test, expect } from '../fixtures/login_fixture';
import { Product } from '../models/product_model';
import { ProductPage } from '../pages/product_page';

test.describe('Produtos', () => {
    test('@P1 Cadastrar produto e listar', async ({page, adminLogin}) => {
        const productPage = new ProductPage(page);
        const product = new Product();

        await page.getByTestId('cadastrar-produtos').click();

        await productPage.createProduct(product);

        await productPage.list();

        const isProductInList = await productPage.findProductInList(product);

        await expect(isProductInList).toBeTruthy();

    });

    test('@P2 Exclusão de produto', async({page, adminLogin}) => {
        test.info().annotations.push({ type: 'priority', description: 'P3' });
        const productPage = new ProductPage(page);

        await page.getByTestId('listar-produtos').click();

        await productPage.list();
        
        const row = 0

        const firstProductOfTable = await productPage.getProductData(row);

        await productPage.deleteProduct(row);

        const isProductInList = await productPage.findProductInList(firstProductOfTable);

        await expect(isProductInList).toBeFalsy();

    })
});