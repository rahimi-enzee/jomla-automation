import { expect, type Locator, type Page } from "@playwright/test";

export class CommunityPage{
  readonly page: Page;
  readonly header: Locator;
  // create community
  readonly createCommunityBtn: Locator;
  readonly newCommunityName: Locator;
  readonly newCommunityStatus: Locator;
  readonly createCommunitySaveBtn: Locator;



  constructor(page: Page) {
    this.page = page;
    this.header = this.page.getByRole('heading', { name: 'Communities', exact:true });
    // create community
    this.createCommunityBtn = this.page.getByRole('button', { name: 'Plus icon Community' });
    this.newCommunityName= this.page.getByRole('textbox', { name: 'Community name', exact: true });
    this.newCommunityStatus = this.page.getByRole('combobox');
    this.createCommunitySaveBtn = this.page.getByRole('button', { name: 'Create' });
    

  }

  async navigateToAndVisible() {
    await expect(this.header).toBeVisible();
  }

  async createCommunity(comName: string) {
    await this.createCommunityBtn.click();
    await this.newCommunityName.click();
    await this.newCommunityName.fill(comName);
    await this.newCommunityStatus.selectOption("public"); // this can be public or private
    await this.createCommunitySaveBtn.click();
  }

  async checkCommunityVisible(comName: string) {
    await expect(this.page.getByRole('heading', { name: comName })).toBeVisible();

  }

  async communityDeletion(comName: string) {
    await this.page.locator('div').filter({ hasText: new RegExp(`^${comName} Visit$`) }).getByRole('button').first().click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }


  


  // search community DONE
  // create new community
  // filter community
  // delete community
  // visit community
  // edit community detail
  // post in community
  // filter post 
  // community gallery
  // community files
  // community members
  // invite member
  // remove member
  // assign member as admin
  // demote admin to member



}