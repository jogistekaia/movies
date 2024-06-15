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

test('Validate Mandatory Fields by Leaving Each Field Empty and Checking Category Error', async ({ page }) => {
  // Function to add a film with given details
  async function addFilm(name: string, eidr: string, rating: string, year: string, selectCategory = true) {
    await page.click('text=Add Film');
    if (name !== '') await page.fill('input[name="name"]', name);
    if (eidr !== '') await page.fill('input[name="eidr"]', eidr);
    if (rating !== '') await page.fill('input[name="rating"]', rating);
    if (year !== '') await page.fill('input[name="year"]', year);
    if (selectCategory) await page.check('text=Comedy');
    await page.click('id=submitFilm');
  }

  await page.goto('http://localhost:3000');

  // Ensure the page is loaded and has the correct title
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Movies');

  // Generate a random EIDR for each test
  const randomEIDR1 = generateRandomEIDR();
  const randomEIDR2 = generateRandomEIDR();
  const randomEIDR3 = generateRandomEIDR();
  const randomEIDR4 = generateRandomEIDR();
  const randomEIDR5 = generateRandomEIDR();

  // Test by leaving the 'name' field empty
  await addFilm('', randomEIDR1, '8', '2023');
  const nameError = page.locator('input[name="name"]:invalid');
  await expect(nameError).toBeVisible();

  // Test by leaving the 'eidr' field empty
  await addFilm('Film 1', '', '8', '2023');
  const eidrError = page.locator('input[name="eidr"]:invalid');
  await expect(eidrError).toBeVisible();

  // Test by leaving the 'rating' field empty
  await addFilm('Film 1', randomEIDR2, '', '2023');
  const ratingError = page.locator('input[name="rating"]:invalid');
  await expect(ratingError).toBeVisible();

  // Test by leaving the 'year' field empty
  await addFilm('Film 1', randomEIDR3, '8', '');
  const yearError = page.locator('input[name="year"]:invalid');
  await expect(yearError).toBeVisible();

  // Test by not selecting any category
  await addFilm('Film 1', randomEIDR4, '8', '2023', false);
  const categoryError = page.locator('text=At least one category must be selected');
  await expect(categoryError).toBeVisible();
});
