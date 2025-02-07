import { expect, type Locator, type Page } from "@playwright/test";

// this is for department and community headers
export class Headers {
  readonly page: Page;
  readonly postPage: Locator;
  readonly galleryPage: Locator;
  readonly filePage: Locator;
  readonly memberPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postPage = page.getByText('Post', { exact: true });
    this.galleryPage = this.page.getByText('Gallery', { exact: true });
    this.filePage = this.page.getByText('Files', { exact: true });
    this.memberPage = this.page.getByText('Members', { exact: true });
  }

  async goToEachPages() {
    await this.galleryPage.click();
    await expect(this.page.getByRole('heading', { name: 'Images' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Videos' })).toBeVisible();

    await this.filePage.click();
    await expect(this.page.getByRole('textbox', { name: 'Search files' })).toBeVisible();

    await this.memberPage.click();
    await expect(this.page.getByRole('textbox', { name: 'Search Member' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Admin', exact: true })).toBeVisible();

    await this.postPage.click()
    await expect(this.page.getByRole('textbox', { name: 'Share Your Thoughts...' })).toBeVisible();
  }

}
