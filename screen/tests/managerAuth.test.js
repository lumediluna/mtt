
import { test, expect } from '@playwright/test';

test('страница manager.itoolabs-stage2 рендерится корректно', async ({ page }) => {
  // Arrange: открыть нужный урл
  await page.goto('https://manager.itoolabs-stage2.exolve.ru/#/', {
    waitUntil: 'networkidle', // подождать, пока всё догрузится
  });

  // можно подождать появления какого-то основного элемента, если знаешь селектор
  // await page.waitForSelector('селектор_основного_блока');

  // Act + Assert: сравнить со скриншотом-эталоном
  await expect(page).toHaveScreenshot('manager-main.png', {
    fullPage: true,
  });
});