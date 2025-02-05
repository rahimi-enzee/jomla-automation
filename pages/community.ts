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

    if (await this.page.getByText('This community name already').isVisible()) {
      console.log("Community with the same name already existed. Skipping test");
      return;
    } else if (await this.page.getByText("A pending request for this community name already exists.").isVisible()) {
      console.log("Already in request. Skipping test");
    }

    await this.newCommunityStatus.selectOption("public"); // this can be public or private
    await this.createCommunitySaveBtn.click();
  }

  async checkCommunityVisible(comName: string) {
    await this.page.reload();
    await expect(this.page.getByRole('heading', { name: comName })).toBeVisible();
  }

  async communityDeletion(comName: string) {
    await this.page.locator('div').filter({ hasText: new RegExp(`^${comName} Visit$`) }).getByRole('button').first().click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async visitCommunity(comName: string) {
    await this.page.locator('div').filter({ hasText: new RegExp(`^${comName} Visit$`) }).getByLabel('Visit').click();
    await expect(this.page.getByText(comName)).toBeVisible();
  }

  async inviteMember(memberName: string) {
    await this.page.getByText('Members').click();
    await this.page.getByRole('button', { name: 'Invite' }).click();
    await this.page.getByRole('textbox', { name: 'Search name' }).fill(memberName);

    // this smell problem, this should be no issue if the name duplicate
    // but it will be problem if the name not duplicate,
    // add condition
    if (await this.page.getByText(memberName).nth(1).isVisible()) {
      await this.page.getByText(memberName).nth(1).click();
    } else {
      await this.page.getByText(memberName).click();
    }


    if (await this.page.getByText('john doe is already a member').isVisible()) {
      console.log("Member already in this community");
      await this.page.getByRole('button', { name: 'Cancel' }).click();
      return;
    }

    await this.page.getByRole('button', { name: 'Add Members' }).click();
  }

  async deleteMember(memberName: string) {
    await this.page.getByText('Members', {exact: true}).click();

    // await this.page.locator('div').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).first().getByRole('button').click();
    // This work!!!! Thank GOD I'm strugling with this locator :'(
    await this.page.locator('div.relative.flex').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).locator('button:has(img[alt="Menu"])').click();

    await this.page.getByRole('button', { name: 'Remove Remove' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();

   }
  


  // search community DONE
  // create new community DONE
  // filter community 
  // delete community DONE
  // visit community  DONE
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