import { test, expect } from "../fixtures/fixture.ts";

test("All pages in dashboard can be click and visited", async ({ dashboardPage, loginAs, loginAsNew }) => {
  await loginAs("testAccount");
  await dashboardPage.allPageCanBeClick("automation");
})
