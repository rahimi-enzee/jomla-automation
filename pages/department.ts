import { expect, type Locator, type Page } from "@playwright/test";

export class DepartmentPage{
  readonly page: Page;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.header = this.page.getByRole('heading', { name: 'Department', exact: true });
    this.header = this.page.locator('div').filter({ hasText: /^Department$/ }).nth(1);
  }

  async navigateToandVisible() {
    await expect(this.header).toBeVisible();
  }

//   visit department (this should be redirect automatically if user only have 1 department)
// post in department
// filter post
// department gallery
// department files
// add member
// assign as admin
// remove member
// edit department details
// demoting admin to member

}