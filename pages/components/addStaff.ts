import { expect, type Locator, type Page } from "@playwright/test";

export class AddStaffComponent {
  readonly page: Page;
  readonly jobTitle: Locator;
  readonly unit: Locator;
  // readonly workPhoneNumber: Locator;
  readonly grade: Locator;
  readonly addBtn: Locator;
  readonly cancelBtn: Locator;


  constructor(page: Page) {
    this.page = page;
    this.jobTitle = this.page.getByRole('button', { name: 'Select Title' });
    this.unit = this.page.getByRole('button', { name: 'Select Unit' });
    // this.workPhoneNumber =
    this.grade = this.page.getByRole('button', { name: 'Select Grade' });
    this.addBtn = this.page.getByRole('button', { name: 'Add' });
    this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });

  };


  async chooseJobTitle() {
    await this.jobTitle.click();
    await this.page.getByRole('menuitem', { name: 'Juruteknik Komputer', exact: true }).click();
  };

  async chooseUnit() {
    await this.unit.click();
    await this.page.getByRole('menuitem', { name: 'kratos' }).click();
  };

  async chooseGrade() {
    await this.grade.click();
    await this.page.getByRole('menuitem', { name: 'N28' }).click();
  };

  async confirmSelection(status: string) {
    if (status === "add") {
      await this.addBtn.click();
    } else if (status === "cancel") {
      await this.cancelBtn.click();
    } else {
      console.log("Cancelling because you give the undefined status");
      await this.cancelBtn.click();
    };

  };

}
