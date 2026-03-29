const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('should display data list and add item', async ({ page }) => {
  const backendCreatedUserFile = process.env.BACKEND_CREATED_USER_FILE;
  const backendCreatedUser = backendCreatedUserFile && fs.existsSync(backendCreatedUserFile)
    ? fs.readFileSync(backendCreatedUserFile, 'utf8').trim()
    : '';

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
  await page.waitForLoadState('networkidle');

  await expect(page.locator('h1')).toHaveText('Data List');
  await expect(page.getByPlaceholder('Enter a neame')).toBeVisible();

  if (backendCreatedUser) {
    await expect(
      page.locator('li').filter({ hasText: backendCreatedUser })
    ).toBeVisible({ timeout: 15000 });
  }

  // add item
  await page.getByPlaceholder('Enter a name').fill(userName);

  const createRequest = page.waitForResponse((response) =>
    response.url().includes('/api/data') &&
    response.request().method() === 'POST' &&
    response.status() === 201
  );

  await page.getByRole('button', { name: 'Add Data' }).click();
  await createRequest;
  await expect(page.getByPlaceholder('Enter a name')).toHaveValue('');

  // verify item
  await expect(
    page.locator('li', { hasText: userName })
  ).toBeVisible({ timeout: 15000 });

});
