import { expect, type Locator, type Page } from "@playwright/test";

export class Posting {
    readonly page: Page;
    // for some reason, dashboard have
    // different sent button locator
    readonly dashboardSendBtn: Locator;
    readonly sendBtn: Locator;
    readonly textboxInput: Locator;



    constructor(page: Page) {
        this.page = page;
        this.dashboardSendBtn = page.locator('.w-10');
        this.sendBtn = page.locator('section').getByRole('button').filter({ hasText: /^$/ });
        this.textboxInput = page.getByRole('textbox', { name: 'Share Your Thoughts...' });
    }
    
    async sendNormalPost(thePost: string) {
        await this.textboxInput.fill(thePost);
        // check if we're on dashboard or else
        if (await this.dashboardSendBtn.isVisible()) {
            // send from dashboard
            await this.dashboardSendBtn.click();
        } else {
            // send from community or department
            await this.sendBtn.click();

        }
    }

}