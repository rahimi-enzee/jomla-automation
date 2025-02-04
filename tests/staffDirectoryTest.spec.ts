import { test, expect } from "../fixtures/fixture.ts";

test.describe("Test staff directory", () => {
    test.beforeEach(async ({loginAs, dashboardPage, staffDirectoryPage}) => {
        await loginAs("testAccount");
        await dashboardPage.staffDirectoryPageCanBeClick();
        await staffDirectoryPage.navigateToAndVisible();
        await staffDirectoryPage.selectDepartment();
    });


    test("Search Member by name", async({staffDirectoryPage}) => {
        await staffDirectoryPage.searchMember("rahimi-qa");
    });

    test("Add new member", async ({staffDirectoryPage}) => {
        await staffDirectoryPage.addAndDeleteMember("rahimi-test");
    });

    test("Test click and view staff profile", async ({staffDirectoryPage}) => {
        await staffDirectoryPage.clickAndOpenStaffProfile("rahimi-qa");
    });
    
});