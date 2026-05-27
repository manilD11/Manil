import {test,expect} from '@playwright/test'

test.only('login test',async ({page})=>{
    await page.goto("https://www.saucedemo.com/")

    await page.fill('#user-name','standard_user')
    await page.fill('#password',"secret_sauce")
    await page.click('#login-button')

    // await page.waitForTimeout(3000)
    await expect(page).toHaveURL(/inventory/)

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    // await page.waitForTimeout(1000)
    await expect(page).toHaveURL('https://www.saucedemo.com/');
})

test.only('error message', async ({page})=>{
    await page.goto("https://www.saucedemo.com/")

    await page.fill('#user-name','locked_out_user')
    await page.fill('#password',"secret_sauce")
    await page.click('#login-button')

    const error = await page.locator('[data-test="error"]').textContent()

    console.log (`Error:${error}`)
    await expect(error).toContain('Sorry, this user has been locked out');
})