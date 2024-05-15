import { Locator, Page } from '@playwright/test';
import { signUpPageSelectors } from '../selectors/signup.selectors';

export class SignupPage {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly consentToTermsCheckbox: Locator;
  readonly finishSignUpBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.fullNameInput = page.getByPlaceholder('Full Name');
    this.emailInput = page.getByPlaceholder('example@example.com');
    this.passwordInput = page.getByPlaceholder('Password', { exact: true });
    this.repeatPasswordInput = page.getByPlaceholder('Repeat Password');
    this.consentToTermsCheckbox = page.locator(
      signUpPageSelectors.consentToTermsCheckbox
    );
    this.finishSignUpBtn = page.getByRole('button', { name: 'Sign up' });
  }
}
