import { expect, type Locator, type Page } from "@playwright/test";

// this is for department and community headers
export class Headers {
  readonly page: Page;
  readonly postPage: Locator;
  readonly galleryPage: Locator;
  readonly filePage: Locator;
  readonly memberPage: Locator;
  readonly activities: Locator;
  readonly bio: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postPage = page.getByText('Post', { exact: true });
    this.galleryPage = this.page.getByText('Gallery', { exact: true });
    this.filePage = this.page.getByText('Files', { exact: true });
    this.memberPage = this.page.getByText('Members', { exact: true });
    this.bio = this.page.getByText("Bio", { exact: true });
    this.activities = this.page.getByText('Activities', { exact: true });
  };

  async galleryCanBeclick() {
    await this.galleryPage.click();
    await expect(this.page.getByRole('heading', { name: 'Images' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Videos' })).toBeVisible();
    console.log("PASSED: Images and Videos under Gallery -- header tab -- visible.");
  };

  async filePageCanBeClick() {
    await this.filePage.click();
    await expect(this.page.getByRole('textbox', { name: 'Search files' })).toBeVisible();
    console.log("PASSED: Search files under File -- header tab -- visible.");
  };

  async memberPageCanBeClick() {
    await this.memberPage.click();
    await expect(this.page.getByRole('textbox', { name: 'Search Member' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Admin', exact: true })).toBeVisible();
    console.log("PASSED: Search Member and Admin under Member -- header tab -- visible.");
  };

  async postPageCanBeClick() {
    await this.postPage.click()
    await expect(this.page.getByRole('textbox', { name: 'Share Your Thoughts...' })).toBeVisible();
    console.log("PASSED: Share Your Thoughts... under Post -- header tab -- visible.");
  };

  async activitiesCanBeClick() {
    await this.activities.click();
    await expect(this.page.getByRole('textbox', { name: 'Share Your Thoughts...' })).toBeVisible();
    await expect(this.page.getByText('All posts')).toBeVisible();
    console.log("PASSED: Share Your Thoughts... and All posts dropdown under Activities -- header tab -- visible.");
  };

  async bioCanBeClick() {
    await this.bio.click();
    await expect(this.page.getByText('Bio Information')).toBeVisible();
    await expect(this.page.getByRole('cell', { name: 'Date of Birth' })).toBeVisible();
    console.log("PASSED: Bio Information and Date of Birth under Profile visible.");
  };

  // this is for department and communities
  async goToEachPages() {
    await this.galleryCanBeclick();
    await this.filePageCanBeClick();
    await this.memberPageCanBeClick();
    await this.postPageCanBeClick();
  };

  // this is for bio/profile
  // activities, bio, gallery, file
  async profileCanGoToEachPages() {
    await this.galleryCanBeclick();
    await this.filePageCanBeClick();
    await this.bioCanBeClick();
    await this.activitiesCanBeClick();
  };

}
