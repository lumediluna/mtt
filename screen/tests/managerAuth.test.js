import { test, expect } from '@playwright/test';
import { managerAuth } from '../../config/envConfig';



test('Экран авторизации под менеджером: главная + hover кнопки "Войти"', async ({ page }) => {
  await page.goto((managerAuth), {
    waitUntil: 'networkidle',
  });

  const loginButton = page.getByRole('button', { name: 'Войти', exact: true });

  await expect(loginButton).toBeVisible();

  const loginBox = await loginButton.boundingBox();
  if (loginBox) {
    await expect(page).toHaveScreenshot('manager-login-static.png', {
      fullPage: false,
      clip: loginBox,
    });
  }

  await loginButton.hover();
  const loginHoverBox = await loginButton.boundingBox();
  if (loginHoverBox) {
    await expect(page).toHaveScreenshot('manager-login-hover.png', {
      fullPage: false,
      clip: loginHoverBox,
    });
  }
});

test('Экран авторизации под менеджером: hover ссылки "Восстановление пароля"', async ({ page }) => {
  await page.goto((managerAuth), {
    waitUntil: 'networkidle',
  });

  // Это span.link-text с текстом "Восстановление пароля"
  const restoreLinkText = page.getByText('Восстановление пароля', { exact: true });

  await expect(restoreLinkText).toBeVisible();

  const box = await restoreLinkText.boundingBox();
  if (box) {
    // статичное состояние
    await expect(page).toHaveScreenshot('manager-restore-static.png', {
      fullPage: false,
      clip: box,
    });

    // наведение мыши по координатам этого текста
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    await expect(page).toHaveScreenshot('manager-restore-hover.png', {
      fullPage: false,
      clip: box,
    });
  }
});