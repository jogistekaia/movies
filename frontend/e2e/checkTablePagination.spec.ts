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

// Function to add a film with given details
async function addFilm(page, name: string, eidr: string, rating: string, year: string, category = 'Comedy') {
  await page.click('text=Add Film');
  await page.fill('input[name="name"]', name);
  await page.fill('input[name="eidr"]', eidr);
  await page.check(`text=${category}`);
  await page.fill('input[name="rating"]', rating);
  await page.fill('input[name="year"]', year);
  await page.click('id=submitFilm');
}

test('Add more than 5 films and check pagination', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Ensure the page is loaded and has the correct title
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Movies');

  // Generate and add 6 films
  for (let i = 1; i <= 6; i++) {
    const randomEIDR = generateRandomEIDR();
    await addFilm(page, `Film ${i}`, randomEIDR, '8', '2023');
  }

  // Go back to the main page
  await page.click('text=Home');

  // Check that only 5 films are displayed on the first page
  const filmRowsOnFirstPage = await page.locator('tbody tr').count();
  expect(filmRowsOnFirstPage).toBe(5);

  // Navigate to the next page
  await page.click('#root > div > div > div:nth-child(2) > div.MuiTablePagination-root.css-jtlhu6-MuiTablePagination-root > div > div.MuiTablePagination-actions > button:nth-child(2) > svg'); // Click the next button SVG icon

});
