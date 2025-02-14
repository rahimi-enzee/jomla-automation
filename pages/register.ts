import { expect, type Locator, type Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };


  async navigateTo() {
    await this.page.goto("/register");
  };

  async newRegister(name: string, email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await this.page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Register' }).click();

  };
};


