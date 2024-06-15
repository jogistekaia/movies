import { test, expect } from '@playwright/test';

// Function to generate a random numeric string
const generateRandomEIDR = () => {
  const characters = '0123456789';
  let result = '';
  const length = 8;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `EIDR-${result}`;
};

test('Add and Delete', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Ensure the page is loaded and has the correct title
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Movies');

  // Generate random EIDRs
  const eidr1 = generateRandomEIDR();
  const eidr2 = generateRandomEIDR();

  // Add first film
  await page.click('text=Add Film');
  await page.fill('input[name="name"]', 'Film 1');
  await page.fill('input[name="eidr"]', eidr1);
  await page.check('text=Comedy');
  await page.fill('input[name="rating"]', '8');
  await page.fill('input[name="year"]', '2023');
  await page.click('id=submitFilm');

  // Ensure Film 1 is visible on the home page
  await page.click('text=Home');
  await page.waitForSelector(`text=${eidr1}`);

  // Try to add a film with the same EIDR and check error message
  await page.click('text=Add Film');
  await page.fill('input[name="name"]', 'Duplicate Film');
  await page.fill('input[name="eidr"]', eidr1);
  await page.check('text=Action');
  await page.fill('input[name="rating"]', '2');
  await page.fill('input[name="year"]', '2022');
  await page.click('id=submitFilm');
  await page.waitForSelector(`text=EIDR already exists`);

  // Change EIDR and add the film again
  const newEIDR = generateRandomEIDR();

  await page.fill('input[name="eidr"]', newEIDR);
  await page.click('id=submitFilm');

  // Go back to the main page
  await page.click('text=Home');

  // Wait for the films to be listed
  await page.waitForSelector(`text=${newEIDR}`);

  // Search for the added films
  await page.fill('id=search', 'Film 1');

  // Find the checkbox for the film with eidr1 and toggle it
  const film1Checkbox = await page.locator('#root > div > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(7) > span > input');
  await film1Checkbox.check();

  // Click the delete button for selected films
  await page.click('text=Delete Selected');


});
