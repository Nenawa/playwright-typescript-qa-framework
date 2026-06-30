import { Locator, Page } from "@playwright/test";
import { Customer } from "../interfaces/Customer";

export class CheckoutPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator; 
    readonly continueButton: Locator;

  constructor(readonly page: Page) {
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]')
    this.continueButton = page.locator('[data-test="continue"]');
  }

  // fill the form with fistrname, last name and zip/postal code
  async fillInformation(customer: Customer) {
    await this.firstNameInput.fill(customer.firstname);
    await this.lastNameInput.fill(customer.lastname);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  // click the "continue" button
  async continue() {
    await this.continueButton.click();
  }
}
