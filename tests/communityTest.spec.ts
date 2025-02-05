import { test, expect } from "../fixtures/fixture.ts";
import { users } from "../data/users.ts";

test.describe("Test community", () => {
    test("create community and super admin approve", async({communityNormalUserPage,superAdminSettingsPage}) => {
        await communityNormalUserPage.createCommunity("automation");
        await superAdminSettingsPage.navigateToAndVisible();
        await superAdminSettingsPage.approveCommunityCreation("automation");
        await communityNormalUserPage.checkCommunityVisible("automation");
        await communityNormalUserPage.communityDeletion("automation");
    });

    test("Approve deletion", async({superAdminSettingsPage}) => {
        await superAdminSettingsPage.approveCommunityDeletion("automation");
    });

})