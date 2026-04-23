import {Page, Locator, expect} from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly flashMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page){
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.locator('form[name="login"] button[type="submit"]');
    this.flashMessage = page.locator('#flash');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });    
  }
  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async expectFlashMessage(text: string) {
    await expect(this.flashMessage).toContainText(text);
  }
}