import { expect, type Locator, type Page } from "@playwright/test";

export class Posting {
    readonly page: Page;
    // for some reason, dashboard have
    // different sent button locator
    readonly dashboardSendBtn: Locator;
    readonly sendBtn: Locator;
    readonly textboxInput: Locator;
    readonly announcementSlider: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardSendBtn = page.locator('.w-10');
        this.sendBtn = page.locator('section').getByRole('button').filter({ hasText: /^$/ });
        this.textboxInput = page.getByRole('textbox', { name: 'Share Your Thoughts...' });
        this.announcementSlider = page.locator('.slider');
    }

    async sendNormalPost(thePost: string, announce: boolean) {
        await this.textboxInput.fill(thePost);

        // set announcement
        if (announce) {
            await this.announcementSlider.click();
        };

        // check if we're on dashboard or else
        if (await this.dashboardSendBtn.isVisible()) {
            // send from dashboard
            await this.dashboardSendBtn.click();
        } else {
            // send from community or department
            await this.sendBtn.click();

        };
    };

    private postText(post: string) {
        return this.page.getByText(post, { exact: true });
    };

    async postVisibility(post: string) {
        await this.postText(post).scrollIntoViewIfNeeded();
        await expect(this.postText(post)).toBeVisible();
    };

    async deletePost(post: string) {
        await this.postText(post).getByRole("img", { name: "Options" }).click();
        await this.page.waitForTimeout(120_000);
    }

}