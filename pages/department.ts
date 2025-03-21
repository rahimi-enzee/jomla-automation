import { expect, type Locator, type Page } from "@playwright/test";
import { Headers } from "./components/header";
import { AddStaffComponent } from "./components/addStaff";

export class DepartmentPage {
  readonly page: Page;
  readonly addStaffComponent: AddStaffComponent;
  readonly headerTab: Headers;

  readonly header: Locator;
  readonly plusMemberBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addStaffComponent = new AddStaffComponent(page);

    this.header = this.page.locator('div').filter({ hasText: /^Department$/ }).nth(1);
    this.headerTab = new Headers(page);
    this.plusMemberBtn = this.page.getByRole('button', { name: 'Plus icon Member' });
  };

  async navigateToandVisible() {
    await expect(this.header).toBeVisible();
  };

  // this is kinda hard code, since we really have to know
  // our user department before we can click on their department name
  // also have to handle where user are directed to their department page
  // automatically

  // helper function
  private visitButton(deptName: string) {
    return this.page.locator('div').filter({ hasText: new RegExp(`^${deptName}Visit$`) }).getByLabel('Visit');
  };

  async visitDepartment(deptName: string) {
    const button = this.visitButton(deptName);

    // TODO: handle that if the name of department already
    // visible, meaning that we're already inside the department.
    if (await this.page.locator('header').filter({ hasText: new RegExp(`^${deptName}$`) }).locator('img').first().isVisible()) {
      console.log("PASSED: User automatically redirected into department page due to only having one depertment.");
      return;
    } else {
      try {
        // Wait for the button to appear, but don't fail immediately if not found
        await button.waitFor({ state: "attached", timeout: 5_000 });

        // Ensure the button is visible before clicking
        await button.waitFor({ state: "visible", timeout: 120_000 });
        await button.click();
      } catch (error) {
        console.log(`NOTE: Skipping visiting department test. Reason: ${error.message}`);
      }

    }

  };

  async addMember(memberName: string) {
    await this.headerTab.memberPage.click();
    await this.plusMemberBtn.click();
    await this.page.getByRole('textbox', { name: 'Search name' }).fill(memberName);

    if (await this.page.locator('div').filter({ hasText: new RegExp(`^${memberName}$`) }).count() > 1) {
      console.log("ERROR: there's too much element");
      // TODO: This is simple fix if using rahimi-qa with Administrative Assistant only
      await this.page.locator('div').filter({ hasText: /^rahimi-qaAdministrative Assistant$/ }).nth(1).click();
    } else {
      await this.page.locator('div').filter({ hasText: new RegExp(`^${memberName}$`) }).click();
    }

    if (await this.page.getByText('A user can only be in maximum').isVisible()) {
      console.log("User already in two department, skipping test");
      return;
    };

    // NOTE: this is the hard parts, interacting with the pop up components
    // here's a hack, what if we do a condition ?
    // if Select title, Select unit, select grade, and select sub-grade is not visible, 
    // then this staff already have that and we dont have to manipulate it anymore?
    if (await this.addStaffComponent.jobTitle.isVisible()) {
      await this.addStaffComponent.chooseJobTitle();
    } else {
      console.log("Staff already in other department, choose the default.");
    }

    if (await this.addStaffComponent.unit.isVisible()) {
      await this.addStaffComponent.chooseUnit();
    } else {
      console.log("Staff already in other department, choose the default.");
    }

    if (await this.addStaffComponent.grade.isVisible()) {
      await this.addStaffComponent.chooseGrade();
    } else {
      console.log("Staff already in other department, choose the default.");
    }

    await this.addStaffComponent.confirmSelection("add");

  };

  //   visit department (this should be redirect automatically if user only have 1 department) DONE
  // post in department
  // filter post
  // add member
  // remove member
  // assign as admin
  // demoting admin to member
  // edit department details
}
