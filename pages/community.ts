import { expect, type Locator, type Page } from "@playwright/test";

export class CommunityPage{
  readonly page: Page;
  readonly header: Locator;


  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'My Wall' });
  }

  // search community
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