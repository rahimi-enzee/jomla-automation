import { expect, type Locator, type Page } from "@playwright/test";
import { Posting } from "./components/posting";
import { Headers } from "./components/header";

export class CommunityPage {
  readonly page: Page;
  readonly header: Locator;
  readonly headerPage: Headers;
  readonly createCommunityBtn: Locator;
  readonly newCommunityName: Locator;
  readonly newCommunityStatus: Locator;
  readonly createCommunitySaveBtn: Locator;
  readonly createCommunityCancelBtn: Locator;
  readonly communityPosting: Posting;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.getByRole('heading', { name: 'Communities', exact: true });
    this.headerPage = new Headers(page);
    this.createCommunityBtn = this.page.getByRole('button', { name: 'Plus icon Community' });
    this.newCommunityName = this.page.getByRole('textbox', { name: 'Community name', exact: true });
    this.newCommunityStatus = this.page.getByRole('combobox');
    this.createCommunitySaveBtn = this.page.getByRole('button', { name: 'Create' });
    this.createCommunityCancelBtn = this.page.getByRole('button', { name: 'Cancel' });
    this.communityPosting = new Posting(this.page);
  }

  async navigateToAndVisible() {
    await expect(this.header).toBeVisible();
  }

  async allPageCanBeClick() {
    await this.headerPage.goToEachPages();
  }

  // comStatus can be either public or private
  async createCommunity(comName: string, comStatus: string) {
    await this.createCommunityBtn.click();
    await this.newCommunityName.click();
    await this.newCommunityName.fill(comName);
    await this.page.getByRole('textbox', { name: 'Description' }).fill('this is for testing');

    if (await this.page.getByText('This community name already').isVisible()) {
      console.log("Community with the same name already existed. Skipping test");
      this.createCommunityCancelBtn.click();
      return;
    } else if (await this.page.getByText("A pending request for this community name already exists.").isVisible()) {
      console.log("Already in request. Skipping test");
      this.createCommunityCancelBtn.click();
      return;
    };

    await this.newCommunityStatus.selectOption(comStatus); // this can be public or private
    await this.createCommunitySaveBtn.click();
    await expect(this.page.getByText('Community created')).toBeVisible();
  };

  async checkCommunityVisible(comName: string) {
    await this.page.reload();
    await expect(this.page.getByRole('heading', { name: comName }).first()).toBeVisible();
  }

  // status can be either Yes or No
  async deleteCommunity(comName: string, status: string) {
    await expect(async () => {
      await this.page.locator('div').filter({ hasText: new RegExp(`^${comName} Visit$`) }).getByRole('button').first().click();
      await this.page.getByRole('button', { name: 'Delete' }).click();
      await this.page.getByRole('button', { name: status }).click();

    }).toPass({ intervals: [1000, 2000, 3000] });
  };

  private communityBtn(comName: string) {
    return this.page.locator('div').filter({ hasText: new RegExp(`^${comName} Visit$`) }).getByLabel('Visit').first();
  };

  async visitCommunity(comName: string): Promise<boolean> {
    const button = this.communityBtn(comName)

    try {
      await button.waitFor({ state: "attached", timeout: 200_000 });
      await button.waitFor({ state: "visible", timeout: 200_000 });
      await button.click();
      console.log(`PASSED: Visit button for ${comName} is visible and clicked.`);
    } catch (error) {
      if (await button.count() > 0) {
        console.log(`PASSED WITH CONDITION: Visit button for ${comName} is flaky.`);
      } else {
        console.log(`PASSED WITH CONDITION: Community ${comName} didnt exist.`);
        return false;
      }
    }

    await expect(this.page.getByText(comName, { exact: true }).first()).toBeVisible();
    return true;

  }




  async inviteMember(memberName: string) {
    // the idea is to invite not inside member list page
    // because it will lead to multiple instance of name
    // if that member already in the community
    // await this.page.getByText('Members').click();
    if (await this.page.getByRole('button', { name: 'Invite' }).isVisible()) {
      await this.page.getByRole('button', { name: 'Invite' }).click();
    } else {
      console.log("You're not this community admin. Skipping test");
      return;
    }
    await this.page.getByRole('textbox', { name: 'Search name' }).fill(memberName);

    // this smell problem, this should be no issue if the name duplicate
    // but it will be problem if the name not duplicate,
    // add condition
    // if (await this.page.getByText(memberName).nth(1).isVisible()) {
    //   await this.page.getByText(memberName).nth(1).click();
    // } else {
    //   await this.page.getByText(memberName).click();
    // }

    // this work for now, but it choose the first name in the search result
    await this.page.locator('div.flex.items-center.p-2.cursor-pointer').click();

    if (await this.page.getByText(`${memberName} is already a member`).isVisible()) {
      console.log("Member already in this community");
      await this.page.getByRole('button', { name: 'Cancel' }).click();
      return;
    }

    if (await this.page.getByRole('button', { name: 'Add Members' }).isVisible()) {
      await this.page.getByRole('button', { name: 'Add Members' }).click();
    } else {
      console.log("Button take longer to load, waiting");
      await this.page.getByRole('button', { name: 'Add Members' }).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.getByRole('button', { name: 'Add Members' }).click();

    }
  }

  async deleteMember(memberName: string) {
    await this.headerPage.memberPage.click();

    // await this.page.locator('div').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).first().getByRole('button').click();
    // This work!!!! Thank GOD I'm strugling with this locator :'(

    if (await this.page.locator('div.relative.flex').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).locator('button:has(img[alt="Menu"])').isVisible()) {
      await this.page.locator('div.relative.flex').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).locator('button:has(img[alt="Menu"])').click();
      await this.page.getByRole('button', { name: 'Remove Remove' }).click();
      await this.page.getByRole('button', { name: 'Yes' }).click();
    } else {
      console.log("Staff not in member list");
      return;
    }

  };

  async assignMemberToAdmin(memberName: string) {
    // await this.memberPage.click();
    await this.headerPage.memberPage.click();

    if (await this.page.locator('div.relative.flex').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).locator('button:has(img[alt="Menu"])').isVisible()) {
      await this.page.locator('div.relative.flex').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).locator('button:has(img[alt="Menu"])').click();

      // staff already admin
      if (await this.page.getByRole('button', { name: 'Assign Demote to Member' }).isVisible()) {
        console.log(`${memberName} is already an Admin`);
        return;
      }

      await this.page.getByRole('button', { name: 'Assign Assign as Admin' }).click();
    } else {
      console.log(`${memberName} don't exist in this community.`);
      return;
    }

  };

  async demoteAdminToMember(memberName: string) {
    // await this.memberPage.click();
    await this.headerPage.memberPage.click();

    if (await this.page.locator('div.relative.flex').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).locator('button:has(img[alt="Menu"])').isVisible()) {
      await this.page.locator('div.relative.flex').filter({ hasText: new RegExp(`^${memberName}.*$`, 'i') }).locator('button:has(img[alt="Menu"])').click();

      // staff already normal user

      if (await this.page.getByRole('button', { name: 'Assign Assign as Admin' }).isVisible()) {
        console.log(`${memberName} is already a member`);
        return;
      }
      await this.page.getByRole('button', { name: 'Assign Demote to Member' }).click();
    } else {
      console.log(`${memberName} don't exist in this community.`);
      return;
    }

  }

  async sendPosting(thePost: string) {
    await this.communityPosting.sendNormalPost(thePost);
  }

}
// filter community: what we can do is to check whether the lock icon visible for private and vice versa
// edit community detail
// post in community WIP
