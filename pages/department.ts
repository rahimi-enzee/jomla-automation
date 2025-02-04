import { expect, type Locator, type Page } from "@playwright/test";

export class DepartmentPage{
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

//   visit department (this should be redirect automatically if user only have 1 department)
// post in department
// filter post
// department gallery
// department files
// add member
// assign as admin
// remove member
// edit department details
// demoting admin to member

}