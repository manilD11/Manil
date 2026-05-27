import {test,expect} from '@playwright/test'

test('test1',async({page})=>{
    await page.goto("https://www.saucedemo.com/")

    const url = await page.url()
    const title = await page.title()

    console.log(`Title: ${title}, Url: ${url}`)

    await expect(page).toHaveTitle(title)
 await expect(page).not.toHaveTitle('SwagLabs')
})