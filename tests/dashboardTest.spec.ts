import { test, expect } from "../fixtures/fixture.ts";
import { departmentName, communityName } from "../data/deptCom.ts";

/*
* There will be 5 test in this file, 
* visiting all pages on intranet 
* but with different account and role.
*/

test.describe("Login and test all pages can be visit", () => {
  test("Production", async ({ dashboardPage, loginAsNew }) => {
    test.setTimeout(120_000);
    await loginAsNew("superAdmin");
    await dashboardPage.allPageCanBeClick(departmentName[3], communityName[2], "superAdmin");
  });

  test("super admin account", async ({ dashboardPage, loginAs }) => {
    test.setTimeout(120_000);
    await loginAs("admin");
    await dashboardPage.allPageCanBeClick(departmentName[0], communityName[0], "admin");
  });

  test.skip("normal user account with one department", async ({ dashboardPage, loginAs }) => {
    await loginAs("testAccount");
    await dashboardPage.allPageCanBeClick(departmentName[1], communityName[1], "tester");
  });

  test.skip("normal user account with one department and is department admin", async ({ dashboardPage, loginAs }) => {
    await loginAs("testAccount1");
    await dashboardPage.allPageCanBeClick(departmentName[1], communityName[0], "tester");
  });

  test.skip("normal user account with two department", async ({ dashboardPage, loginAs }) => {
    await loginAs("testAccount2");
    await dashboardPage.allPageCanBeClick(departmentName[2], communityName[1], "tester");
  });

  test.skip("normal user account with two department and is department admin", async ({ dashboardPage, loginAs }) => {
    await loginAs("testAccount3");
    await dashboardPage.allPageCanBeClick(departmentName[2], communityName[0], "tester");
  });
});
