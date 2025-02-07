import { expect, type Locator, type Page } from "@playwright/test";
import { Headers } from "./components/header";

export class DepartmentPage{
  readonly page: Page;
  readonly header: Locator;
  readonly headerPage: Headers;

  constructor(page: Page) {
    this.page = page;
    // this.header = this.page.getByRole('heading', { name: 'Department', exact: true });
    this.header = this.page.locator('div').filter({ hasText: /^Department$/ }).nth(1);
    this.headerPage = new Headers(page);
  };

  async navigateToandVisible() {
    await expect(this.header).toBeVisible();
  };

  // this is kinda hard code, since we really have to know
  // our user department before we can click on their department name
  // also have to handle where user are directed to their department page
  // automatically
  async visitDepartment(deptName: string) {
    // if button no visible -> just return
    if (await this.page.locator('div').filter({ hasText: new RegExp(`^${deptName}Visit$`)  }).getByLabel('Visit').isVisible()) {
      await this.page.locator('div').filter({ hasText:new RegExp(`^${deptName}Visit$`) }).getByLabel('Visit').click();
    
      // this else if is stupid fix, but its working for now
    } else if (await this.page.locator('div').filter({ hasText: new RegExp(`^${deptName}Visit$`)  }).getByLabel('Visit').isHidden()) {
      await this.page.locator('div').filter({ hasText:new RegExp(`^${deptName}Visit$`) }).getByLabel('Visit').waitFor({state: "visible", timeout: 120_000});
      await this.page.locator('div').filter({ hasText:new RegExp(`^${deptName}Visit$`) }).getByLabel('Visit').click();
    };
  }

  async allPageCanBeClick() {
    await this.headerPage.goToEachPages();
  }
  

//   visit department (this should be redirect automatically if user only have 1 department) DONE
// post in department
// filter post
// department gallery DONE
// department files DONE
// add member
// remove member
// assign as admin
// demoting admin to member
// edit department details
}