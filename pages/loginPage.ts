import { expect, Locator, Page } from '@playwright/test';

//TODO: needs a base page

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly lockedOutUserError: Locator;
    readonly credentialsNotCorrectError: Locator;
    readonly passwordRequiredError: Locator;
    readonly usernameRequiredError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("[id='user-name']");
        this.password = page.locator("[id='password']");
        this.loginButton = page.locator("[id='login-button']");
        this.lockedOutUserError = page.getByText("Epic sadface: Sorry, this user has been locked out.");
        this.credentialsNotCorrectError = page.getByText("Epic sadface: Username and password do not match any user in this service");
        this.passwordRequiredError = page.getByText("Epic sadface: Password is required");
        this.usernameRequiredError = page.getByText("Epic sadface: Username is required");
    }

    async navigateToLoginPage() {
        console.log('navigating to login page');
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Imperative testing:
    async fillUsername(expected_username: string) {
        await this.username.fill(expected_username);
    }

    async fillPassword(expected_password: string) {
        await this.password.fill(expected_password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    // Declarative testing:
    async performLogin(expected_username: string, expected_password: string) {
        await this.username.fill(expected_username);
        await this.password.fill(expected_password);
        await this.loginButton.click();
    }

    async assertLockedOutUser() {
        await expect(async () => {
            await expect(this.lockedOutUserError).toBeVisible();
        }).toPass();
    }

    async assertCredentialsNotCorrectError() {
        await expect(async () => {
            await expect(this.credentialsNotCorrectError).toBeVisible();
        }).toPass();
    }

    async assertPasswordIsRequiredError() {
        await expect(async () => {
            await expect(this.passwordRequiredError).toBeVisible();
        }).toPass();
    }

    async assertUsernameIsRequiredError() {
        await expect(async () => {
            await expect(this.usernameRequiredError).toBeVisible();
        }).toPass();
    }
}
