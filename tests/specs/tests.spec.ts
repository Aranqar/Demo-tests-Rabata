import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import RANDOM_NUM from '../utils';

const FIRST_RANDOM_EMAIL_NUM = RANDOM_NUM();
const SEC_RANDOM_EMAIL_NUM = RANDOM_NUM();

test.describe('Rabata.io test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can successfully sign up with valid credentials', async ({
    homePage,
    signupPage,
    page,
  }) => {
    await homePage.signUpLink.click();
    await expect(signupPage.page).toHaveURL(/signup/);
    await signupPage.fullNameInput.pressSequentially('test123 123');
    await signupPage.emailInput.pressSequentially(
      `example${FIRST_RANDOM_EMAIL_NUM}@${SEC_RANDOM_EMAIL_NUM}example.com`
    );
    await signupPage.passwordInput.pressSequentially('Password123!');
    await signupPage.repeatPasswordInput.pressSequentially('Password123!');
    await signupPage.consentToTermsCheckbox.click();
    await signupPage.finishSignUpBtn.click();
    await expect(page.getByText('Verify your email')).toBeVisible();
    await expect(
      page.getByText(
        `example${FIRST_RANDOM_EMAIL_NUM}@${SEC_RANDOM_EMAIL_NUM}example.com`
      )
    ).toBeVisible();
  });

  test('Try It For Free button redirects to the sign-up page', async ({
    homePage,
    page,
  }) => {
    await homePage.mainTryItForFreeBtn.click();
    await expect(page).toHaveURL(/signup/);
  });

  test('Privacy Policy page is displayed correctly', async ({ homePage }) => {
    homePage.openPrivacyPolicyModal();
    await expect(homePage.privacyPolicyTitle).toBeVisible();
    await expect(homePage.privacyPolicyText).toBeVisible();
  });

  test('Privacy Policy modal closes correctly when clicking OK', async ({
    homePage,
  }) => {
    homePage.openPrivacyPolicyModal();
    await homePage.privacyPolicyModal.getByText('OK', { exact: true }).click();
    await expect(homePage.privacyPolicyModal).not.toBeVisible();
  });

  test('Privacy Policy modal closes correctly when clicking X', async ({
    homePage,
  }) => {
    homePage.openPrivacyPolicyModal();
    await homePage.privacyPolicyModal.getByRole('img').click();
    await expect(homePage.privacyPolicyModal).not.toBeVisible();
  });

  test('Initial total data stored and monthly costs are displayed correctly', async ({
    homePage,
  }) => {
    await expect(homePage.totalDataStoredText).toContainText('100');
    await expect(homePage.monthlyLoadedDataText).toContainText('100');
    await expect(homePage.yearlyRabataChartPrice).toContainText('$36000 / yr');
  });

  test('Total data stored and monthly costs update correctly with highest input values', async ({
    homePage,
  }) => {
    await homePage.monthlyDataLoadInput.fill('1000');
    await homePage.dataStoredInput.fill('1000');
    await expect(homePage.yearlyRabataChartPrice).toContainText('$360000 / yr');
  });

  test('Total data stored and monthly costs update correctly with lowest input values', async ({
    homePage,
  }) => {
    await homePage.monthlyDataLoadInput.fill('1');
    await homePage.dataStoredInput.fill('1');
    await expect(homePage.yearlyRabataChartPrice).toContainText('$360 / yr');
  });
});
