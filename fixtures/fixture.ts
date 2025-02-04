import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";
import { CommunityPage } from "../pages/community";
import { StaffDirectoryPage } from "../pages/staffDirectory";
import { DepartmentPage } from "../pages/department";

import { users } from "../data/users";
type UserRole = keyof typeof users;

type JomlaFixture = {
  loginPage: LoginPage;
  loginAs: (role: UserRole) => Promise<void>;
  dashboardPage: DashboardPage;
  communityPage: CommunityPage;
  staffDirectoryPage: StaffDirectoryPage;
  departmentPage: DepartmentPage;
}

export const test = base.extend<JomlaFixture>({
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

  communityPage: async ({page}, use)=> {
    const communityPage= new CommunityPage(page);
    await use (communityPage);
  },
  
  staffDirectoryPage: async ({page}, use)=> {
    const staffDirectoryPage= new StaffDirectoryPage(page);
    await use (staffDirectoryPage);
  },

  departmentPage: async ({page}, use)=> {
    const departmentPage= new DepartmentPage(page);
    await use (departmentPage);
  },
  
});

export { expect };