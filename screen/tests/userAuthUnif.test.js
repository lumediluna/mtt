import { test, expect } from '@playwright/test';
import { userAuthUnif } from '../../config/envConfig';



test('Экран авторизации под сотрудниковм ВАТС: главная + hover кнопки "Войти"', async ({ page }) => {
  await page.goto((userAuthUnif), {
    waitUntil: 'networkidle',
  });

  const loginButton = page.getByRole('button', { name: 'Войти', exact: true });

  await expect(loginButton).toBeVisible();

  const loginBox = await loginButton.boundingBox();
  if (loginBox) {
    await expect(page).toHaveScreenshot('user-login-static.png', {
      fullPage: false,
      clip: loginBox,
    });
  }

  await loginButton.hover();
  const loginHoverBox = await loginButton.boundingBox();
  if (loginHoverBox) {
    await expect(page).toHaveScreenshot('user-login-hover.png', {
      fullPage: false,
      clip: loginHoverBox,
    });
  }
});

test('Экран авторизации под сотрудниковм ВАТС: hover ссылки "Восстановление пароля"', async ({ page }) => {
  await page.goto((userAuthUnif), {
    waitUntil: 'networkidle',
  });

  // Это span.link-text с текстом "Восстановление пароля"
  const restoreLinkText = page.getByText('Восстановление пароля', { exact: true });

  await expect(restoreLinkText).toBeVisible();

  const box = await restoreLinkText.boundingBox();
  if (box) {
    // статичное состояние
    await expect(page).toHaveScreenshot('user-restore-static.png', {
      fullPage: false,
      clip: box,
    });

    // наведение мыши по координатам этого текста
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    await expect(page).toHaveScreenshot('user-restore-hover.png', {
      fullPage: false,
      clip: box,
    });
  }
});


test('Экран авторизации под сотрудниковм ВАТС: hover ссылки "Зарегистрироваться"', async ({ page }) => {
  await page.goto((userAuthUnif), {
    waitUntil: 'networkidle',
  });

  // Это span.link-text с текстом "Восстановление пароля"
  const restoreLinkText = page.getByText('Зарегистрироваться', { exact: true });

  await expect(restoreLinkText).toBeVisible();

  const box = await restoreLinkText.boundingBox();
  if (box) {
    // статичное состояние
    await expect(page).toHaveScreenshot('user-register-static.png', {
      fullPage: false,
      clip: box,
    });

    // наведение мыши по координатам этого текста
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    await expect(page).toHaveScreenshot('user-register-hover.png', {
      fullPage: false,
      clip: box,
    });
  }
});