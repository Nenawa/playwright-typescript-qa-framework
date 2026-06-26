import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import users from "../../test-data/users.json";

test.describe("Login", () => {
  // test passant
  const validUsers = users.validUser;
  for (const validUser of validUsers) {
    test(`successful login - ${validUser.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(validUser);

      await expect(page).toHaveURL(/inventory/);
    });
  }

  // Test non passant
  const invalidUsers = users.invalidUser;
  for (const invalidUser of invalidUsers) {
    test(`Unsuccessful login - ${invalidUser.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(invalidUser);

      await expect(page).toHaveURL(/inventory/);
    });
  }
});
