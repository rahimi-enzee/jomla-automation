import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  // old/staging interface
  readonly loginBtn: Locator;
  readonly email: Locator;
  readonly password: Locator;
  // new/production interface
  readonly newLoginBtn: Locator;
  readonly newLoginEmail: Locator;
  readonly nextBtn: Locator;
  readonly newLoginPassword: Locator;
  readonly signInBtn: Locator;
  readonly rememberMe: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole('button', { name: 'Log in' });
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.newLoginBtn = page.getByRole('link', { name: 'Login' });
    this.newLoginEmail = page.getByRole('textbox', { name: 'Enter your email, phone, or' });
    this.nextBtn = page.getByRole('button', { name: 'Next' });
    this.newLoginPassword = page.getByRole('textbox', { name: 'Enter the password for' });
    this.signInBtn = page.getByRole('button', { name: 'Sign in' });
    this.rememberMe = page.getByRole('button', { name: 'No' });
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


  // NOTE: this is for production

  async startNewLogin(email: string, password: string) {
    await this.page.goto("https://jomla.tourism.gov.my/");
    await this.newLoginBtn.click();
    await this.newLoginEmail.fill(email);
    await this.nextBtn.click();
    await this.newLoginPassword.fill(password);
    await this.signInBtn.click();
    await this.rememberMe.click();
  }

}
