import { Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage {
  readonly finishButton: Locator;
  readonly paymentInformation: Locator;
  readonly shippingInformation :Locator;
  readonly totalPrice: Locator;

  constructor(readonly page: Page) {
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.paymentInformation = page.locator('[data-test="payment-info-value"]');
    this.shippingInformation = page.locator('[data-test="shipping-info-value"]');
  }

  checkoutItem(product: string): Locator {
    return this.page
      .locator('[data-test="inventory-item-name"]')
      .filter({ hasText: product });
  }

  async finish() {
    await this.finishButton.click();
  }
}
