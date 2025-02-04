import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginBtn: Locator;
  readonly email: Locator;
  readonly password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole('button', { name: 'Log in' });
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.password = page.getByRole('textbox', { name: 'Password' });
  }

  async navigateToAndVisible() {
    await this.page.goto("/");
    await expect(this.loginBtn).toBeVisible();
  }

  async startLogin(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

}
