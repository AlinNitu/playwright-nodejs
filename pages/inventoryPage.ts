import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly shoppingCart: Locator;
    readonly inventoryContainter: Locator;


    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator("[id='shopping_cart_container']");
        this.inventoryContainter = page.locator("[data-test='inventory-container']");
    }

    async assertShoppingCartIsVisible() {
        // this should be a wrapper
        await expect(async () => {
            await expect(this.shoppingCart).toBeVisible();
        }).toPass();
    }

    async assertPageTitle(expected_title: string) {        
        await expect(async () => {
            await expect(this.page).toHaveTitle(expected_title);
        }).toPass();
    }

    async assertInventoryContainerIsVisible() {      
        await expect(async () => {
            await expect(this.inventoryContainter).toBeVisible();
        }).toPass();
    }
}
