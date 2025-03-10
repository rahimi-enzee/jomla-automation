import { test, expect } from "../fixtures/fixture.ts";

test("profile page", async ({ profilePage }) => {
    await profilePage.navigateTo();
    await profilePage.changeProfilePicture();
});

test("Change bio information", async ({ profilePage }) => {
    await profilePage.navigateTo();
    await profilePage.changeBioInformation("1999-12-31", "+60 11-1111-1111");
});