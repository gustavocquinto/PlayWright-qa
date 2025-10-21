import { test, expect } from '../fixtures/login_fixture';
import { Product } from '../models/product_model';
import { ProductPage } from '../pages/product_page';

test.describe('Produtos', () => {
    test('Cadastrar produto e listar', async ({page, adminLogin}) => {
        const productPage = new ProductPage(page);
        const product = new Product();

        await page.getByTestId('cadastrar-produtos').click();

        await productPage.createProduct(product.name, product.price, product.description, product.quantity, product.image);

        await expect(page.getByText('Lista dos Produtos')).toBeVisible();

        await page.waitForSelector('table tbody tr', {state: 'visible'});

        const table = await page.locator('table tbody');
        let found = false;
        //Itero pelo itens da tabela e busco o item recém criado
        for (const row of await table.locator('tr').all()){
            const col = await row.locator('td').all();
            const productNameCol = await col[0].innerText();
            const priceCol = await col[1].innerHTML();
            const descriptionCol = await col[2].innerHTML();
            const quantityCol = await col[3].innerHTML();
            const imageCol = await col[4].innerHTML();

            const storedImagePath = "C:\\fakepath\\" + product.image;

            if(productNameCol == product.name && priceCol == product.price && descriptionCol == product.description 
            && quantityCol == product.quantity && imageCol == storedImagePath){
                console.log(`Name of stored product: ${product.name} Saved: ${productNameCol}`);
                console.log(`Price of stored product: ${product.price} Saved: ${priceCol}`);
                console.log(`Description of stored product: ${product.description} Saved: ${descriptionCol}`);
                console.log(`Quantity of stored product: ${product.quantity} Saved: ${quantityCol}`);
                console.log(`Image of stored product: ${product.image} Saved: ${storedImagePath}`);
                found = true;
                break;  
            }
        };
        await expect(found).toBeTruthy();
    })
});