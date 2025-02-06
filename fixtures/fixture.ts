import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";
import { CommunityPage } from "../pages/community";
import { StaffDirectoryPage } from "../pages/staffDirectory";
import { DepartmentPage } from "../pages/department";
import { SettingsPage } from "../pages/settings";

import { users } from "../data/users";
type UserRole = keyof typeof users;

type JomlaFixture = {
  normalUserContext: {context: any; page: any};
  superAdminContext: {context: any; page: any};
  loginPage: LoginPage;
  loginAs: (role: UserRole) => Promise<void>;
  dashboardPage: DashboardPage;
  communityNormalUserPage: CommunityPage;
  communitySuperAdminPage: CommunityPage;
  staffDirectoryPage: StaffDirectoryPage;
  departmentPage: DepartmentPage;
  superAdminSettingsPage: SettingsPage;
};

export const test = base.extend<JomlaFixture>({
  normalUserContext: async({browser}, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.navigateToAndVisible();
    await loginPage.startLogin(users.testAccount.email, users.testAccount.password);

    await use({context, page});
    // await context.close();
  },

  superAdminContext: async({browser}, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.navigateToAndVisible();
    await loginPage.startLogin(users.admin.email, users.admin.password);

    await use({context, page});
    // await context.close();
  },


  // TODO: Check if this fixture is still needed or we can use 
  // above user context fully
  loginAs: async ({ page }, use) => {
    await use(async (role: UserRole) => {
      const user = users[role];

      if (!user) {
        throw new Error("Invalid account");
      }

      const loginPage = new LoginPage(page);
      await loginPage.navigateToAndVisible();
      await loginPage.startLogin(user.email, user.password);
    });
  },

  dashboardPage: async ({page}, use)=> {
    const dashboardPage = new DashboardPage(page);
    await use (dashboardPage);
  },

  // browser context yawww
  communityNormalUserPage: async ({normalUserContext}, use) => {
    const communityPage = new CommunityPage(normalUserContext.page);
    const dashboardPage = new DashboardPage(normalUserContext.page);
    await dashboardPage.communityPageCanBeClick();
    await use(communityPage);
  },

  // TODO: we dont need this for now
  // communitySuperAdminPage: async ({superAdminContext}, use) => {
  //   const communityPage = new CommunityPage(superAdminContext.page);
  //   const dashboardPage = new DashboardPage(superAdminContext.page);
  //   await dashboardPage.communityPageCanBeClick();
  //   await use(communityPage);
  // },
  
  staffDirectoryPage: async ({page}, use)=> {
    const staffDirectoryPage= new StaffDirectoryPage(page);
    await use (staffDirectoryPage);
  },

  departmentPage: async ({page}, use)=> {
    const departmentPage= new DepartmentPage(page);

    const loginPage = new LoginPage(page);
    await loginPage.navigateToAndVisible();
    await loginPage.startLogin(users.testAccount.email, users.testAccount.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.departmentPageCanBeClick();

    await use (departmentPage);
  },

  superAdminSettingsPage: async ({superAdminContext}, use) => {
    const settingsPage = new SettingsPage(superAdminContext.page);
    const dashboardPage = new DashboardPage(superAdminContext.page);
    await dashboardPage.settingsPageCanBeClick();
    await use(settingsPage);
  }
  
});

export { expect };