import { LoginPage } from "../../pages/LoginPage";
import test, { expect } from "@playwright/test";
import users from "../../test-data/users.json";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutInformationPage } from "../../pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../../pages/CheckoutCompletePage";

test("Complete purchase", async ({ page }) => {
  // login
  const loginPage = new LoginPage(page);
  const validUser = users.validUser[0];
  console.log("valid user:", validUser);
  await loginPage.openAndLogin(validUser);

  // Inventory
  await expect(page).toHaveURL(/inventory/);
  const inventoryPage = new InventoryPage(page);
  const inventoryItem = "sauce-labs-backpack";
  console.log("product:", inventoryItem);
  await inventoryPage.addProduct(inventoryItem);
  await inventoryPage.openCart();

  // Cart
  await expect(page).toHaveURL(/cart/);
  const cartPage = new CartPage(page);
  const product = "Sauce Labs Backpack";
  await expect(cartPage.cartItem(product)).toBeVisible();
  await cartPage.checkout();

  //Checkout informations
  await expect(page).toHaveURL(/checkout-step-one/);
  const checkoutInformationPage = new CheckoutInformationPage(page);
  const customer = {
    firstname: "anne",
    lastname: "wal",
    postalCode: "12345",
  };
  await checkoutInformationPage.fillInformation(customer);
  await checkoutInformationPage.continue();

  // Checkout overview
  await expect(page).toHaveURL(/checkout-step-two/);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  await expect(checkoutOverviewPage.checkoutItem(product)).toBeVisible();
  await expect(checkoutOverviewPage.paymentInformation).toBeVisible();
  await expect(checkoutOverviewPage.shippingInformation).toBeVisible();
  await expect(checkoutOverviewPage.totalPrice).toBeVisible();
  await checkoutOverviewPage.finish();

  // checkout Complete
  await expect(page).toHaveURL(/checkout-complete/);
  const checkoutCompletePage = new CheckoutCompletePage(page);
  await expect(checkoutCompletePage.orderConfirmationMessage).toBeVisible();
  await checkoutCompletePage.returnToCatalog();

  // Home page
  await expect(page).toHaveURL(/inventory/);
});
