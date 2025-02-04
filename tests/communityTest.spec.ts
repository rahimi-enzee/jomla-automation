import { test, expect } from "../fixtures/fixture.ts";
import { users } from "../data/users.ts";

test.describe("Test community", () => {
    test.beforeEach(async ({loginAs}) => {
        await loginAs("testAccount");
    });

    test("Navigate to community page after login", async ({dashboardPage}) => {
        await dashboardPage.communityPageCanBeClick();
    })
})