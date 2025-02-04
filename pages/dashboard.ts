import { expect, type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly header: Locator;
  readonly staffDirectory: Locator;
  readonly community: Locator;
  readonly department: Locator;


  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'My Wall' });
    this.staffDirectory = page.getByRole('link', { name: 'Staff Directory Staff' })
    this.community = page.getByRole('link', { name: 'Community' });
    this.department = page.getByRole('link', { name: 'Department Department' });
  }

  async navigateToAndVisible() {
    // await this.page.goto("/dashboard"); // there's no need for this, because of auto redirect
    await expect(this.header).toBeVisible();
  }

  // this will click the community icon and redirect to community page
  async communityPageCanBeClick() {
    await this.community.click();
  }
  // this will click the staff dir icon and redirect to community page
  async staffDirectoryPageCanBeClick() {
    await this.staffDirectory.click();
  }
  // this will click the department icon and redirect to community page
  async DepartmentPageCanBeClick() {
    await this.department.click();
  }
}

