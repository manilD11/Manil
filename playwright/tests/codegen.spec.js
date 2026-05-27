import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https:youtube.com');

  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('RCB ins');
  await page.getByRole('combobox', { name: 'Search' }).press('ArrowDown');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');


  await expect(page).toHaveURL(/search_query/);

  await expect(page.locator('#video-title').first()).toBeVisible();

});
