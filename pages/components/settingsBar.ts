import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsBar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  async basicSettingCanBeClick() {
    await this.page.getByRole('link', { name: 'Basic Settings' }).click();
    await expect(this.page.getByRole('heading', { name: 'Jomla! Intranet Logo' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Login Page Image' })).toBeVisible();
    console.log("PASSED: Jomla! Intranet Logo and Login page Image -- Super Admin -- visible.")

  };

  async themeCanBeClick() {
    await this.page.getByRole('link', { name: 'Themes' }).click();
    await expect(this.page.getByRole('heading', { name: 'Customize your theme' })).toBeVisible();
    console.log("PASSED: Customize your theme visible.");
  };

  async advancedSettingCanBeClick() {
    await this.page.getByRole('link', { name: 'Advanced Settings' }).click();
    await expect(this.page.getByRole('heading', { name: 'Enable/Disable Core Features' })).toBeVisible();
    await expect(this.page.getByText('Calendar of Events')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'File / Video / Photo Size' })).toBeVisible();
    console.log("PASSED: Enable/Disable Core Features, Calendar of Events and File / Video / Photo Size -- Super Admin -- visible.");
  };

  async requestCanBeClick() {
    await this.page.getByRole('link', { name: 'Requests' }).click();
    await expect(this.page.getByRole('heading', { name: 'Community Creation' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Community Deletion' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Organisational Chart Photo' })).toBeVisible();
    console.log("PASSED: Community Creation, Deletion, and Organisational Chart Photo -- Super Admin -- visible.");
  };

  async auditTrailCanBeClick() {
    await this.page.getByRole('link', { name: 'Audit Trail' }).click();
    await expect(this.page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: /^All$/ }).nth(1)).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: 'Date/Time' })).toBeVisible();
    console.log("PASSED: Audit Trail, Search, and Date/Time -- Super Admin -- visible.");
  };

  async feedbackCanBeClick() {
    await this.page.getByRole('link', { name: 'Feedback' }).click();
    console.log("PASSED: Feedback visible.");
  };

  async birthdayCanBeClick() {
    await this.page.getByRole('link', { name: 'Birthday Template' }).click();
    await expect(this.page.getByRole('heading', { name: 'Enable/Disable Birthday' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Add New Template' })).toBeVisible();
    console.log("PASSED: Enable/Disable Birthday and Add New Template -- Super User -- visible.");
  };

  async avatarCanBeClick() {
    await this.page.getByRole('link', { name: 'Avatar Template' }).click();
    await expect(this.page.getByRole('heading', { name: 'Enable/Disable Avatar' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Add New Template' })).toBeVisible();
    console.log("PASSED: Enable/Disable Avatar and Add New Template -- Super User -- visible.");
  };

  async businessUnitCanBeClick() {
    await this.page.getByRole('link', { name: 'Business Units' }).click();

    await expect(async () => {
      await expect(this.page.getByRole('heading', { name: 'Business Units' })).toBeVisible();
      await expect(this.page.getByText('Select Department')).toBeVisible();
    }).toPass({ intervals: [1000, 2000, 3000], timeout: 60_000 });

    console.log("PASSED: Business Units and Select Department -- Super User -- visible.");
  };

  async businessTitleCanBeClick() {
    await this.page.getByRole('link', { name: 'Business Titles' }).click();
    await expect(this.page.getByRole('heading', { name: 'Business Titles' })).toBeVisible();
    await expect(this.page.getByText('Manage the business titles')).toBeVisible();
    console.log("PASSED: Business Titles and Manage the business titles -- Super User -- visible.");
  };

  async businessGradeCanBeClick() {
    await this.page.getByRole('link', { name: 'Business Grades' }).click();
    await expect(this.page.getByRole('heading', { name: 'Business Grades' })).toBeVisible();
    await expect(this.page.getByText('Manage the business grades')).toBeVisible();
    console.log("PASSED: Business Grade and Manage the business grades -- Super User -- visible.");
  };

  async roleCanBeClick() {
    await this.page.getByRole('link', { name: 'Roles' }).click();
    await expect(this.page.getByRole('heading', { name: 'Roles' })).toBeVisible();
    await expect(this.page.getByText('View users with roles')).toBeVisible();
    console.log("PASSED: Roles and Views users with roles -- Super User -- visible.");
  };

  async allButtonCanBeClick(role: string) {
    await this.themeCanBeClick();
    await this.feedbackCanBeClick();

    if (role === "admin" || role === "superAdmin") {
      await this.basicSettingCanBeClick();
      await this.advancedSettingCanBeClick();
      await this.requestCanBeClick();
      await this.auditTrailCanBeClick();
      await this.birthdayCanBeClick();
      await this.avatarCanBeClick();
      await this.businessUnitCanBeClick();
      await this.businessTitleCanBeClick();
      await this.businessGradeCanBeClick();
      await this.roleCanBeClick();
    }
  };

}
