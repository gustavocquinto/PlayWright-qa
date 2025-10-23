import { faker } from "@faker-js/faker/locale/pt_BR";

export class Product{
    name: string;
    price: string;
    description: string;
    quantity: string;
    image: string;

    constructor(){
        this.name = faker.commerce.product();
        this.price = faker.number.int().toString();
        this.description = faker.commerce.productDescription();
        this.quantity = faker.finance.amount({dec: 0});
        this.image = 'playwright-report.png';
    }
}
