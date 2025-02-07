import { expect, type Locator, type Page } from "@playwright/test";
import { DepartmentPage } from "./department";
import { CommunityPage } from "./community";
import { LoginPage } from "./login";
import { Headers } from "./components/header";

export class DashboardPage {
  readonly page: Page;
  readonly departmentPage: DepartmentPage;
  readonly communityPage: CommunityPage;
  readonly loginPage: LoginPage;
  readonly headersTab: Headers;

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
  readonly logoutDashboard: Locator;
  readonly profileBtn: Locator;
  readonly ownProfile: Locator;


  constructor(page: Page) {
    this.page = page;
    this.departmentPage = new DepartmentPage(page);
    this.communityPage = new CommunityPage(page);
    this.loginPage = new LoginPage(page);
    this.headersTab = new Headers(page);

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
    this.logoutDashboard = page.getByRole('link', { name: 'Logout Logout' });
    this.profileBtn = this.page.getByRole("button", {name: "Profile"});
    this.ownProfile = this.page.getByRole("link", {name: "My Profile"});
  };


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
    await this.communityPage.visitCommunity("new com");
    await this.communityPage.allPageCanBeClick();
  };

  async staffDirectoryPageCanBeClick() {
    await this.staffDirectory.click();
    await expect(this.page.getByRole('button', { name: 'Visit Department' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: '+ Member' })).toBeVisible();
  };

  async departmentPageCanBeClick(departmentName: string) {
    await this.department.click();
    await expect(this.page.getByRole('heading', { name: 'Department', exact: true })).toBeVisible();
    await this.departmentPage.visitDepartment(departmentName);
    await this.communityPage.allPageCanBeClick();
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

  async profileCanBeClick() {
    await this.profileBtn.click();
    await this.ownProfile.click();
    await expect(this.page.getByRole('heading', { name: 'My Profile' })).toBeVisible();
    await expect(this.page.getByText('Bio', { exact: true })).toBeVisible();
    await this.headersTab.profileCanGoToEachPages();
  };

  async logoutDashboardCanBeClick() {
    await this.logoutDashboard.click();
    await expect(this.page.getByText('Email')).toBeVisible();
    await expect(this.page.getByText('Password')).toBeVisible();
  }


  async allPageCanBeClick(departmentName: string) {
    await this.staffDirectoryPageCanBeClick();
    await this.calendarPageCanBeClick();
    await this.departmentPageCanBeClick(departmentName);
    await this.communityPageCanBeClick();
    await this.fileManagementPageCanBeClick();
    await this.mediaPageCanBeClick();
    await this.linkHomePageCanBeClick();
    await this.settingsPageCanBeClick();
    await this.dashboardHomePageCanBeClick();
    await this.profileCanBeClick();
    await this.logoutDashboardCanBeClick();
  };
}

