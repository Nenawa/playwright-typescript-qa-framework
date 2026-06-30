import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  // Returns the locator of the specified product in the shopping cart.
  cartItem(product: string): Locator {
    return this.page
      .locator('[data-test="inventory-item-name"]')
      .filter({ hasText: product });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
