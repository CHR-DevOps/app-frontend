const { test, expect } = require('@playwright/test');

test('should display data list and add item', async ({ page }) => {

  const now = new Date();

  const dateString =
    now.getFullYear() + "-" +
    (now.getMonth() + 1) + "-" +
    now.getDate() + "_" +
    now.getHours() + "-" +
    now.getMinutes() + "-" +
    now.getSeconds();

  const userName = `PlaywrightUser_${dateString}`;

  await page.goto('/');

  await expect(page.locator('h1')).toHaveText('Data List');

  // add item
  await page.fill('input[placeholder="Enter a name"]', userName);
  await page.click('button[type="submit"]');

  // verify item
  await expect(
    page.locator('li', { hasText: userName })
  ).toBeVisible();

});