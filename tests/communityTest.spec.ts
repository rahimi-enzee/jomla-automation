import { test, expect } from "../fixtures/fixture.ts";
import { users } from "../data/users.ts";

test.describe("Test community", () => {
    test.beforeEach(async ({loginAs, dashboardPage}) => {
        await loginAs("testAccount");
        await dashboardPage.communityPageCanBeClick();
    });

    test("Navigate to community page after login", async ({dashboardPage}) => {
        await dashboardPage.communityPageCanBeClick();
    })
})