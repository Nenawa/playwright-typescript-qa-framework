import { Locator, Page } from "@playwright/test";
import { User } from "../interfaces/User";

export class LoginPage {
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(user: User) {
    await this.page.locator('[data-test="username"]').fill(user.username);
    await this.page.locator('[data-test="password"]').fill(user.password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async openAndLogin(user: User) {
  await this.goto();
  await this.login(user);
}
}
