import { expect, type Locator, type Page } from "@playwright/test";

export class StaffDirectoryPage {
  readonly page: Page;
  readonly header: Locator;
  readonly departmentSelection: Locator;
  readonly departmentName: Locator;
  readonly visitDeptBtn: Locator;
  readonly searchInput: Locator;
  // add member locators
  readonly addMemberBtn: Locator;
  readonly addMemberInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole("heading", { name: "Staff Directory" });
    this.departmentSelection = page.getByRole("img", { name: "Toggle Dropdown" });
    // TODO: fix this naming later, add like a parameter so that tester can use any department name that they want
    this.departmentName = page.getByText("new department");
    this.visitDeptBtn = page.getByRole("button", { name: "Visit Department" });
    this.searchInput = page.getByRole("textbox", { name: "Search name" });
    // add member locator
    this.addMemberBtn = page.getByRole("button", { name: "+ Member" });
    this.addMemberInput = page.locator('div').filter({ hasText: /^Visit Department\+ MemberAdd staffCancelAdd$/ }).getByPlaceholder('Search name');
  };

  async navigateToAndVisible() {
    await expect(this.header).toBeVisible()
  };

  async selectDepartment() {
    await this.departmentSelection.click();
    await this.departmentName.click();
    await expect(this.visitDeptBtn).toBeVisible();
    await expect(this.addMemberBtn).toBeVisible();
  };

  // helper 
  private searchStaffBtn(memberName: string) {
    return this.page.getByRole("link", { name: memberName, exact: true });
  }

  async searchMember(memberName: string) {
    await this.searchInput.fill(memberName);
    await expect(this.searchStaffBtn(memberName)).toBeVisible();
  };

  async clickOnMemberName(memberName: string) {
    await this.searchInput.fill(memberName);
    await this.page.getByRole('link', { name: new RegExp(`^${memberName}\\s+${memberName}\\s+.*$`, 'i') }).click();
  };

  async addAndDeleteMember(memberName: string) {
    // add member 
    await this.addMemberBtn.click();
    await this.addMemberInput.fill(memberName);
    // FIXME: The problem here is that, there will be two name if the staff
    // already in the department, one from the list and one from the search result
    // I use nth(1) to indicate the second name which on the pop up component.
    // for some reason the pop up component have the nth(1)
    // very stupid solution indead
    // await this.page.getByText(memberName, { exact: true }).nth(1).click();

    // this is the clever solution,thank god for codegen!
    await this.page.locator('div').filter({ hasText: new RegExp(`^${memberName}$`) }).click();


    // if staff already in 2 department, there will be alert 
    if (await this.page.getByRole('heading', { name: 'Cannot Add User' }).isVisible()) {
      console.log("User already in 2 department, skipping this test");
      return;
    }

    // TODO: This is stupid solution, look for other ways after this.
    await this.page.locator('button[aria-haspopup="menu"]').nth(0).click();
    await this.page.getByRole('menuitem', { name: 'Driver', exact: true }).click();
    await this.page.getByRole('button', { name: 'Select Unit' }).click();
    await this.page.getByRole('menuitem', { name: '-' }).click();

    // if user already in a department, select grade prompt will not be visible
    if (await this.page.getByRole('button', { name: 'Select Grade' }).isVisible()) {
      await this.page.getByRole('button', { name: 'Select Grade' }).click();
      await this.page.getByRole('menuitem', { name: 'B1', exact: true }).click();
    } else {
      console.log("Select Grade button not found, continue to next test...");
    }

    await this.page.getByRole('button', { name: 'Add' }).click();

    // add checking for keep or remove user
    // if user already in department, just add him
    if (await this.page.getByRole('button', { name: 'Yes, Remove' }).isVisible()) {
      await this.page.getByRole('button', { name: 'No, Keep & Add' }).click();
    } else {
      console.log("User didn't have any department, continue")

    }

    await expect(this.page.getByRole("heading", { name: memberName, exact: true })).toBeVisible();

    // delete member
    await this.page.getByRole("button", { name: "Visit Department" }).click();
    await this.page.getByText('Members').click();
    await this.page.getByRole('link', { name: new RegExp(`^${memberName}\\b`, 'i') }).getByRole('button').click();
    await this.page.getByRole('button', { name: 'Remove Remove' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();

  };

  // view staff profile
  async clickAndOpenStaffProfile(memberName: string) {
    await this.page.getByRole('link', { name: memberName }).click();
    await expect(this.page.getByRole('heading', { name: memberName })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'User Profile' })).toBeVisible();
  };


};
