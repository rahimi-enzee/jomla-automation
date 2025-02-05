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
    await expect(this.page.getByText(comName)).toBeVisible();
    await this.page.getByRole('button', { name: 'Approve' }).first().click();
  }

  // go to request, then approve the community deletion
  async approveCommunityDeletion(comName: string) {
    await this.requestBtn.click()
    await expect(this.page.getByText(comName)).toBeVisible();
    // I dont have any idea what is this locator, at least it worked
    await this.page.locator('div').filter({ hasText: "Community Deletion" }).locator('div').filter({ hasText: comName }).getByRole('button', { name: 'Approve' }).first().click();
  }

}

