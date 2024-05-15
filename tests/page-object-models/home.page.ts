import { Locator, Page } from '@playwright/test';
import { homePageSelectors } from '../selectors/home.selectors';

export class HomePage {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly mainTryItForFreeBtn: Locator;
  readonly privacyPolicyBtn: Locator;
  readonly privacyPolicyTitle: Locator;
  readonly privacyPolicyText: Locator;
  readonly privacyPolicyModal: Locator;
  readonly totalDataStoredText: Locator;
  readonly monthlyLoadedDataText: Locator;
  readonly yearlyRabataChartPrice: Locator;
  readonly monthlyDataLoadInput: Locator;
  readonly dataStoredInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.mainTryItForFreeBtn = page.locator(
      homePageSelectors.mainTryItForFreeBtn
    );
    this.privacyPolicyBtn = page.getByText('Privacy policy', { exact: true });
    this.privacyPolicyTitle = page.getByText('Privacy Policy', { exact: true });
    this.privacyPolicyText = page.getByText(
      'If you have any questions about this Policy or Rabata’s data collection, use, and disclosure practices, please contact us at support@rabata.io.'
    );
    this.privacyPolicyModal = page.locator(homePageSelectors.privacyModal);
    this.totalDataStoredText = page.locator(
      homePageSelectors.totalDataStoredText
    );
    this.monthlyLoadedDataText = page.locator(
      homePageSelectors.monthlyLoadedDataText
    );
    this.yearlyRabataChartPrice = page.locator(
      homePageSelectors.yearlyRabataChartPrice
    );
    this.monthlyDataLoadInput = page.locator(
      homePageSelectors.monthlyDataLoadInput
    );
    this.dataStoredInput = page.locator(homePageSelectors.dataStoredInput);
  }

  async openPrivacyPolicyModal() {
    await this.privacyPolicyBtn.click();
  }
}
