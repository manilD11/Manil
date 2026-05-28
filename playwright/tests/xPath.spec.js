import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.fill("//input[@id='user-name']","standard_user");
    await page.fill("//input[@id='password']","secret_sauce");

    await page.click("//input[@id='login-button']");

    await expect(page).toHaveURL(/inventory/);

});

test('Login 1', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.fill("//input[@id='user-name']","standard_user");
    await page.fill("//input[@id='password']","secretsauce");

    await page.click("//input[@id='login-button']");

    const error = await page.locator('[data-test="error"]').textContent()

    console.log (`Error:${error}`)
    await expect(error).toContain('Username and password');
});


test('Login 2', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.fill("//input[@id='password']","secret_sauce");
    await page.click("//input[@id='login-button']");

    const error = await page.locator("//h3[@data-test='error']").textContent()

    
    console.log (`Error:${error}`)
    await expect(error).toContain("Username")

});


test('Login 3', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.fill("//input[@id='user-name']","standard_user");

    await page.click("//input[@id='login-button']");

    const error = await page.locator('[data-test="error"]').textContent()

    
    console.log (`Error:${error}`)
    await expect(error).toContain("required")

});