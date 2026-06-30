import { LoginPage } from "../../pages/LoginPage";
import test, { expect } from "@playwright/test";
import users from "../../test-data/users.json";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";

test("Complete purchase", async ({ page }) => {
  // login
  const loginPage = new LoginPage(page);
  const validUser = users.validUser[0];
  console.log("valid user:", validUser);
  await loginPage.openAndLogin(validUser);

  // Inventory
  await expect(page).toHaveURL(/inventory/);
  const inventoryPage = new InventoryPage(page);
  const product = "sauce-labs-backpack";
  console.log("product:", product);
  await inventoryPage.addProduct(product);
  await inventoryPage.openCart();

  // Cart
  await expect(page).toHaveURL(/cart/);
  const cartPage = new CartPage(page);
  const cartItem = "Sauce Labs Backpack";
  expect(cartPage.cartItem(cartItem)).toBeVisible();
  await cartPage.checkout();

  //Checkout
  
});
