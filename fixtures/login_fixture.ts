import {baseTest as base} from '../fixtures/base_fixture';
import { LoginPage } from '../pages/access_page';

type LoginFixtures = {
    adminLogin: void;
    commonLogin: void;
};

export const test = base.extend<LoginFixtures>({
    adminLogin: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.acessoAdministrador();

        await use();
    },
})

export { expect } from '@playwright/test';