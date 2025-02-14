import { test, expect } from "../fixtures/fixture.ts";

test.describe("Login and test all pages can be visit", () => {
  test("super admin account", async ({ dashboardPage, loginAs }) => {
    await loginAs("admin");
    await dashboardPage.allPageCanBeClickAdmin("automation");
  });

  test("normal user account", async ({ dashboardPage, loginAs }) => {
    await loginAs("testAccount");
    await dashboardPage.allPageCanBeClickUser("automation");
  });
});
