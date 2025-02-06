import { test, expect } from "../fixtures/fixture.ts";


test("Check if every pages inside Community can be click and visibility", async({communityNormalUserPage}) => {
    await communityNormalUserPage.visitCommunity("new com");
    await communityNormalUserPage.allPageCanBeClick();
});

test("Create and delete communities, with admin approval for both", async({communityNormalUserPage,superAdminSettingsPage}) => {
    // Need a way to handle this condition
    await communityNormalUserPage.createCommunity("automation1");
    await superAdminSettingsPage.navigateToAndVisible();
    await superAdminSettingsPage.approveCommunityCreation("automation1");
    await communityNormalUserPage.checkCommunityVisible("automation1");
    await communityNormalUserPage.communityDeletion("automation1");
    await superAdminSettingsPage.approveCommunityDeletion("automation1");
});

test("Visit community, invite member", async({communityNormalUserPage}) => {
    await communityNormalUserPage.visitCommunity("new com");
    await communityNormalUserPage.inviteMember("John Doe");
    await communityNormalUserPage.deleteMember("John Doe");
})

test("Assign and demote Admin", async({communityNormalUserPage}) => {
    await communityNormalUserPage.visitCommunity("new com");
    await communityNormalUserPage.assignMemberToAdmin("John Doe");
    await communityNormalUserPage.demoteAdminToMember("John Doe");
})

test("Send post in community", async({communityNormalUserPage}) => {
    await communityNormalUserPage.visitCommunity("new com");
    await communityNormalUserPage.sendPosting("My name is bingo ! raff raff");
})
