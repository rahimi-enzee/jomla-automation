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

    constructor(page:Page) {
        this.page = page;
        this.header = page.getByRole("heading", {name: "Staff Directory"});
        this.departmentSelection = page.getByRole("img", {name: "Toggle Dropdown"});
        // TODO: fix this naming later, add like a parameter so that tester can use any department name that they want
        this.departmentName = page.getByText("new department"); 
        this.visitDeptBtn = page.getByRole("button", {name:"Visit Department"});
        this.searchInput = page.getByRole("textbox", {name: "Search name"});
        // add member locator
        this.addMemberBtn = page.getByRole("button", {name: "+ Member"});
        this.addMemberInput = page.locator('div').filter({ hasText: /^Visit Department\+ MemberAdd staffCancelAdd$/ }).getByPlaceholder('Search name');
    }

  async navigateToAndVisible() {
    await expect(this.header).toBeVisible()
  }

  async selectDepartment(){
    await this.departmentSelection.click();
    await this.departmentName.click();
    await expect(this.visitDeptBtn).toBeVisible();
    await expect(this.addMemberBtn).toBeVisible();
  }

  async searchMember(memberName: string) {
    await this.searchInput.fill(memberName);
    await expect(this.page.getByRole("link", {name: memberName, exact: true})).toBeVisible();
  }

  async addAndDeleteMember(memberName: string) {
    // add member 
    await this.addMemberBtn.click();
    await this.addMemberInput.fill(memberName);
    await this.page.getByText(memberName, {exact: true}).click();
    await this.page.getByRole('button', { name: 'Select Title' }).click();
    await this.page.getByRole('menuitem', { name: 'Driver', exact: true }).click();
    await this.page.getByRole('button', { name: 'Select Unit' }).click();
    await this.page.getByRole('menuitem', { name: '-' }).click();
    await this.page.getByRole('button', { name: 'Select Grade' }).click();
    await this.page.getByRole('menuitem', { name: 'B1', exact: true }).click();
    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page.getByRole("heading", {name: "rahimi-test"})).toBeVisible();

    // delete member
    await this.page.getByRole("button", {name: "Visit Department"}).click();
    await this.page.getByText('Members').click();
    await this.page.getByRole('link', { name: memberName}).getByRole('button').click(); 
    await this.page.getByRole('button', { name: 'Remove Remove' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();

  }

  // view staff profile
  async clickAndOpenStaffProfile(memberName: string) {
    await this.page.getByRole('link', { name: memberName }).click();
    await expect(this.page.getByRole('heading', { name: memberName })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'User Profile' })).toBeVisible();
  }


}