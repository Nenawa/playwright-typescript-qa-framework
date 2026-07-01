import { Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {
  readonly orderConfirmationMessage: Locator;
  readonly backHomeButton: Locator;
  constructor(page: Page) {
    this.orderConfirmationMessage = page.locator(
      '[data-test="complete-header"]',
    );
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async returnToCatalog() {
    await this.backHomeButton.click();
  }
}
