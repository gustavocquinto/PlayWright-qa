import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/access_page.js';


export const baseTest = base.extend<{forEachTest: void}>({
    forEachTest: [async ({page}, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.acessarPagina();
        await use();
        
    }, {auto: true}],
});

export { expect } from '@playwright/test';