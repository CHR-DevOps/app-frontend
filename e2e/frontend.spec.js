const { test, expect } = require('@playwright/test');

test('should display data list and add item', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Data List');

  // Add new item
  await page.fill('input[placeholder="Enter a name"]', 'PlaywrightUser');
  await page.click('button[type="submit"]');

  // Wait for new item to appear
  await expect(page.locator('li', { hasText: 'PlaywrightUser' })).toBeVisible();
});