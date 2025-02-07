import { expect, type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly header: Locator;
  readonly dashboard: Locator;
  readonly staffDirectory: Locator;
  readonly community: Locator;
  readonly department: Locator;
  readonly settings: Locator;
  readonly dashboardHome: Locator;
  readonly calendar: Locator;
  readonly fileManagement: Locator;
  readonly media: Locator;
  readonly linkHome: Locator;


  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'My Wall' });
    
    this.staffDirectory = page.getByRole('link', { name: 'Staff Directory Staff' })
    this.community = page.getByRole('link', { name: 'Community' });
    this.department = page.getByRole('link', { name: 'Department Department' });
    this.settings = page.getByRole("link", {name:'Settings Settings'});
    this.dashboardHome = page.getByRole('link', { name: 'Dashboard Dashboard' });
    this.calendar = this.page.getByRole('link', { name: 'Calendar Calendar' });
    this.fileManagement = this.page.getByRole('link', { name: 'File Management File' });
    this.media = page.getByRole('link', { name: 'Media Media' });
    this.linkHome = page.getByRole('link', { name: 'Link Link' });
  }

  async navigateToAndVisible() {
    // await this.page.goto("/dashboard"); // there's no need for this, because of auto redirect
    await expect(this.header).toBeVisible();
  };

  async dashboardHomePageCanBeClick() {
    await this.dashboardHome.click();
    await expect(this.page.getByRole('heading', { name: 'My Wall' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Advertisement' })).toBeVisible();
  }

  async calendarPageCanBeClick() {

    if (await this.calendar.isVisible()) {
      await this.calendar.click()
      await expect(this.page.getByRole('button', { name: 'Today' })).toBeVisible();
      await expect(this.page.getByLabel('Sunday')).toBeVisible();
    } else {
      console.log("Super Admin disabled calendar feature..");
    }
  }

  async communityPageCanBeClick() {
    await this.community.click();
    await expect(this.page.getByRole('heading', { name: 'Search Communities' })).toBeVisible();
    await expect(this.page.getByText('All', { exact: true })).toBeVisible();
  };

  async staffDirectoryPageCanBeClick() {
    await this.staffDirectory.click();
    await expect(this.page.getByRole('button', { name: 'Visit Department' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: '+ Member' })).toBeVisible();
  };

  async departmentPageCanBeClick() {
    await this.department.click();
    await expect(this.page.getByRole('heading', { name: 'Department', exact: true })).toBeVisible();
  };

  async fileManagementPageCanBeClick() {
    await this.fileManagement.click();
    await expect(this.page.getByRole('heading', { name: 'Search Files' })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: 'File Name' })).toBeVisible();
  };

  async mediaPageCanBeClick() {
    await this.media.click();
    await expect(this.page.getByRole('heading', { name: 'Images' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Videos' })).toBeVisible();
  };

  async linkHomePageCanBeClick() {
    await this.linkHome.click();
    await expect(this.page.getByRole('heading', { name: 'Systems' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Official File' })).toBeVisible();
  };

  async settingsPageCanBeClick() {
    await this.settings.click();
    await expect(this.page.getByRole('link', { name: 'Themes' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Feedback' })).toBeVisible();
  };

  async allPageCanBeClick() {
    await this.staffDirectoryPageCanBeClick();
    await this.calendarPageCanBeClick();
    await this.departmentPageCanBeClick();
    await this.communityPageCanBeClick();
    await this.fileManagementPageCanBeClick();
    await this.mediaPageCanBeClick();
    await this.linkHomePageCanBeClick();
    await this.settingsPageCanBeClick();
    await this.dashboardHomePageCanBeClick();
  };
}

