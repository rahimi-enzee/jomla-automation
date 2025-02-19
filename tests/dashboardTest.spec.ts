import { test, expect } from "../fixtures/fixture.ts";

test.describe("Login and test all pages can be visit", () => {
  test.skip("super admin account", async ({ dashboardPage, loginAs }) => {
    await loginAs("admin");
    await dashboardPage.allPageCanBeClick("automation", "hadramawt", "admin");
  });

  test("normal user account with two department", async ({ dashboardPage, loginAs }) => {
    await loginAs("testAccount");
    await dashboardPage.allPageCanBeClick("automation", "hadramawt", "tester");
  });

  test.skip("normal user account with one department", async ({ dashboardPage, loginAs }) => {
    await loginAs("fakeUser1");
    await dashboardPage.allPageCanBeClick("automation", "excommunicado", "tester");
  });
});
