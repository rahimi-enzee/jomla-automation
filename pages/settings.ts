import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsPage {
  readonly page: Page;
  readonly header: Locator;
  readonly requestBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'Settings' });
    this.requestBtn = page.getByRole('link', { name: 'Requests' });
  }

  async navigateToAndVisible() {
    await expect(this.header).toBeVisible();
  }

  // go to request, then approve the community based on name
  async approveCommunityCreation(comName: string) {
    await this.requestBtn.click()
    if (await this.page.getByText(comName).first().isVisible()) {
      await expect(this.page.getByText(comName).first()).toBeVisible();
      await this.page.getByRole('button', { name: 'Approve' }).first().click();
    } else {
      console.log(`${comName} Not available in request. Check if it already existed in community or something wrong with creation process.`);
      return;
    }
  }

  // go to request, then approve the community deletion
  async approveCommunityDeletion(comName: string) {
    await this.requestBtn.click()
    await this.page.reload();
    // await expect(this.page.getByText(comName).first()).toBeVisible();

    if (await this.page.getByText(comName).first().isVisible()) {
      // I dont have any idea what is this locator, at least it worked
      await this.page.locator('div').filter({ hasText: "wants to delete" }).locator('div').filter({ hasText: comName }).getByRole('button', { name: 'Approve' }).first().click();


    } else {
      console.log(`${comName} not in request list.`);
      return;
    }
  }

}

