import { LoginPage } from "../../pages/LoginPage";
import test, { expect } from "@playwright/test";
import users from "../../test-data/users.json";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutInformationPage } from "../../pages/CheckoutInformationPage";

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
  await expect(cartPage.cartItem(cartItem)).toBeVisible();
  await cartPage.checkout();

  //Checkout
  await expect(page).toHaveURL(/checkout-step-one/);
  const checkoutInformationPage = new CheckoutInformationPage(page);
  const customer = {
    firstname: "anne",
    lastname: "wal",
    postalCode: "12345",
  };
  await checkoutInformationPage.fillInformation(customer);
  await checkoutInformationPage.continue();
});
