// @ts-check
const { test, expect } = require('@playwright/test');

test('get the diagnosis', async ({ page }) => {
  await page.goto('/human-model');

  // Expects to show diagnose button
  await expect(page.getByRole('button', { name: 'Diagnose' })).toBeVisible();

});
test('navigate to human model page', async ({ page }) => {
  await page.goto('/human-model');

  // Expects to show diagnose button
  await expect(page.getByRole('button', { name: 'Diagnose' })).toBeVisible();

});

test('navigate to home page', async ({ page }) => {
  await page.goto('/');

  // Expects to show Home heading
  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();

});

test('navigate to Upload Image page', async ({ page }) => {
  await page.goto('/image-upload');

  // Expects to show Upload Image heading
  await expect(page.getByRole('heading', { name: 'Upload Image' })).toBeVisible();

});
