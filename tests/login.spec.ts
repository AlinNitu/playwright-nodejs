import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { UserCredentials, PasswordCredentials } from '../utils/credentials';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigateToLoginPage();
    });

    test('user is logged in successfully with valid credentials', async () => {
        await loginPage.performLogin(UserCredentials.STANDARD_USER, PasswordCredentials.VALID_PASSWORD);
        await inventoryPage.assertShoppingCartIsVisible();
        await inventoryPage.assertInventoryContainerIsVisible();
    });

    test('locked out user cannot login', async () => {
        await loginPage.performLogin(UserCredentials.LOCKED_OUT_USER, PasswordCredentials.VALID_PASSWORD);
        await loginPage.assertLockedOutUser();
    });

    test('user attempts login with valid username and invalid password', async () => {
        await loginPage.performLogin(UserCredentials.STANDARD_USER, PasswordCredentials.INVALID_PASSWORD);
        await loginPage.assertCredentialsNotCorrectError();
    });

    test('user attempts login with valid username and empty password', async () => {
        await loginPage.performLogin(UserCredentials.STANDARD_USER, '');
        await loginPage.assertPasswordIsRequiredError();
    });

    test('user attempts login with empty username and valid password', async () => {
        await loginPage.performLogin('', PasswordCredentials.VALID_PASSWORD);
        await loginPage.assertUsernameIsRequiredError();
    });

    /* 
    TODO: many other scenarios to be covered:
    - invalid username and invalid password.
    - empty username and empty password.
    - special characters that are not accepted by the system.
    - long strings that are not acceoted by the system.
    - verify login performance
    etc
    */
});
