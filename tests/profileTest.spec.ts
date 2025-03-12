import { test, expect } from "../fixtures/fixture.ts";
import { users } from "../data/users.ts";

test("profile page", async ({ profilePage }) => {
    await profilePage.navigateTo();
    await profilePage.changeProfilePicture();
});

test("Change bio information", async ({ profilePage }) => {
    await profilePage.navigateTo();
    await profilePage.changeBioInformation(users.testAccount.dob, users.testAccount.whatsappNumber);
});

test("Change department info -- 1 department", async ({ profilePage }) => {
    await profilePage.navigateTo();
    await profilePage.changeDepartmentInfo();

});