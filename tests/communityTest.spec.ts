import { test, expect } from "../fixtures/fixture.ts";

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

    test("Visit community, invite member", async({communityNormalUserPage}) => {
        await communityNormalUserPage.visitCommunity("new com");
        await communityNormalUserPage.inviteMember("John Doe");
        await communityNormalUserPage.deleteMember("John Doe");
    })

    test("Send post in community", async({communityNormalUserPage}) => {
        await communityNormalUserPage.visitCommunity("new com");
        await communityNormalUserPage.sendPosting("Nama saya bingo! nyiaw nyiaw");
    })

})