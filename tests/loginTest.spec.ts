import { test, expect } from "../fixtures/fixture.ts";
import { users } from "../data/users.ts";


test.describe("Test login with admin and test account", () => {
  for (const role of Object.keys(users)) {
    test(`Test for ${role}`, async ({ loginAs, dashboardPage }) => {
      await loginAs(role as keyof typeof users);
      await dashboardPage.navigateToAndVisible();
    });
  }
})
