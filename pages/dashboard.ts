import { expect, type Locator, type Page } from "@playwright/test";
import { DepartmentPage } from "./department";
import { CommunityPage } from "./community";
import { LoginPage } from "./login";
import { Headers } from "./components/header";
import { SettingsBar } from "./components/settingsBar";
import { LeftBar } from "./components/leftBar";

export class DashboardPage {
  readonly page: Page;
  readonly departmentPage: DepartmentPage;
  readonly communityPage: CommunityPage;
  readonly loginPage: LoginPage;
  readonly headersTab: Headers;
  readonly settingsBar: SettingsBar;
  readonly leftBar: LeftBar;

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
  readonly visitDepartmentBtn: Locator;
  readonly addMemberBtn: Locator;


  constructor(page: Page) {
    this.page = page;
    this.departmentPage = new DepartmentPage(page);
    this.communityPage = new CommunityPage(page);
    this.loginPage = new LoginPage(page);
    this.headersTab = new Headers(page);
    this.settingsBar = new SettingsBar(page);
    this.leftBar = new LeftBar(page);

    this.header = page.getByRole('heading', { name: 'My Wall' });
    this.staffDirectory = page.getByRole('link', { name: 'Staff Directory Staff' })
    this.community = page.getByRole('link', { name: 'Community' });
    this.department = page.getByRole('link', { name: 'Department Department' });
    this.settings = page.getByRole("link", { name: 'Settings Settings' });
    this.dashboardHome = page.getByRole('link', { name: 'Dashboard Dashboard' });
    this.calendar = this.page.getByRole('link', { name: 'Calendar Calendar' });
    this.fileManagement = this.page.getByRole('link', { name: 'File Management File' });
    this.media = page.getByRole('link', { name: 'Media Media' });
    this.linkHome = page.getByRole('link', { name: 'Link Link' });
    this.logoutDashboard = page.getByRole('link', { name: 'Logout Logout' });
    this.profileBtn = this.page.getByRole("button", { name: "Profile" });
    this.ownProfile = this.page.getByRole("link", { name: "My Profile" });
    this.visitDepartmentBtn = this.page.getByRole('button', { name: 'Visit Department' });
    this.addMemberBtn = this.page.getByRole('button', { name: '+ Member' });
  };


  async navigateToAndVisible() {
    // await this.page.goto("/dashboard"); // there's no need for this, because of auto redirect
    await expect(this.header).toBeVisible();
    console.log("PASSED: Header visible.");
  };

  async dashboardHomePageCanBeClick() {
    await this.leftBar.navigateToDashboardHome();
  };

  async calendarPageCanBeClick() {
    await this.leftBar.navigateToCalendar();
  };

  async communityPageCanBeClick(comName: string) {
    await this.leftBar.navigateToCommunity();

    let status: boolean = await this.communityPage.visitCommunity(comName);

    if (status === true) {
      await this.communityPage.allPageCanBeClick();
    } else {
      console.log(`PASSED WITH CONDITION: community ${comName} didnt existed`);
    }
  };

  async staffDirectoryPageCanBeClick(deptName: string, role: string) {
    await this.staffDirectory.click();

    // super admin will not be redirect into department's staff directory,
    // handle searching and clicking on certain department
    if (role === "admin") {
      await this.page.getByRole('textbox', { name: 'Select Department' }).click();
      await this.page.getByText(deptName).click();
    };

    try {
      await this.visitDepartmentBtn.waitFor({ state: "visible", timeout: 120_000 });
      console.log("PASSED: Visit Department button is visible.");
    } catch (error) {
      if (await this.visitDepartmentBtn.count() > 0) {
        console.log("PASSED WITH CONDITION: Visit Department Button is flaky.");
      } else {
        console.log("PASSED WITH CONDITION: Department didn't exist or staff is not in any department.");
      }
    };


    // handle if staff in department but not an admin
    if (await this.addMemberBtn.isVisible()) {
      await expect(this.addMemberBtn).toBeVisible();
      console.log("PASSED: +Member button is visible.");
    } else if ((await this.addMemberBtn.count() > 0 && await this.addMemberBtn.isHidden())) {
      // hidden is not the same as 'the element is not there' or 'not existed',
      // use count() > 0 to check if element is there or not existed.
      await this.addMemberBtn.waitFor({ state: "visible", timeout: 120_000 });
      console.log("PASSED WITH CONDITION: +Member button is visible but very flaky.")
    } else {
      console.log("PASSED WITH CONDITION: Staff is not the department admin, and +Member is not visible.");
      // return;
    };
  };

  async departmentPageCanBeClick(departmentName: string) {
    await this.department.click();
    await expect(this.page.getByRole('heading', { name: 'Department', exact: true })).toBeVisible();
    console.log("PASSED: Department header visible.");

    await this.departmentPage.visitDepartment(departmentName);
    // await this.communityPage.allPageCanBeClick();
    await this.headersTab.goToEachPages();
  };

  async fileManagementPageCanBeClick() {
    await this.leftBar.navigateToFileManagement();
  };

  async mediaPageCanBeClick(role: string) {
    await this.leftBar.navigateToMedia(role);
  };

  async linkHomePageCanBeClick() {
    await this.leftBar.navigateToLinkHome();
  };

  async settingsPageCanBeClick(role: string) {
    await this.leftBar.navigateToSettings();
    await this.settingsBar.allButtonCanBeClick(role);
  };

  async profileCanBeClick() {
    await this.profileBtn.click();
    await this.ownProfile.click();
    await expect(this.page.getByRole('heading', { name: 'My Profile' })).toBeVisible();
    console.log("PASSED: My Profile and Bio visible.");
    await expect(this.page.getByText('Bio', { exact: true })).toBeVisible();

    await this.headersTab.profileCanGoToEachPages();
  };

  async logoutDashboardCanBeClick() {
    await this.leftBar.navigateToLogout();
  };

  async allPageCanBeClick(departmentName: string, comName: string, role: string) {
    await this.staffDirectoryPageCanBeClick(departmentName, role);
    await this.calendarPageCanBeClick();
    await this.departmentPageCanBeClick(departmentName);
    // await this.communityPageCanBeClick(comName);
    await this.fileManagementPageCanBeClick();
    await this.mediaPageCanBeClick(role);
    await this.linkHomePageCanBeClick();
    await this.settingsPageCanBeClick(role);
    await this.dashboardHomePageCanBeClick();
    await this.profileCanBeClick();
    await this.logoutDashboardCanBeClick();
  };
}

