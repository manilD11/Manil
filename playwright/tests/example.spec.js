// @ts-check
import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


test ('1st',async ({page})=> {

  await expect(100).toBe(100)
})

//use test.skip to skip tht test 
test.skip('2nd',async ({page})=> {

  await expect(100).toBe(101)
})


test ('3rd',async ({page})=> {

  await expect(10.0).toBe(10.0)
})

// use  test.only to run single test 
test('name test',async ({page})=>{
const text = "Life is the flower for which love is the honey.";

await expect(text).toContain('Life');

await expect(text).toContain('flower');
})
