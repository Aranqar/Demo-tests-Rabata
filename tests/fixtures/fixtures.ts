import { test as base } from '@playwright/test';
import { HomePage } from '../page-object-models/home.page';
import { SignupPage } from '../page-object-models/signup.page';

interface TestFixtures {
  homePage: HomePage;
  signupPage: SignupPage;
}

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
});
