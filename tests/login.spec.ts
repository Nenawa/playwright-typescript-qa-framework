import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import users from "../test-data/users.json";

test("successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.validUser);

  await expect(page).toHaveURL(/inventory/);
});
