import { test, expect } from "@playwright/test";
import { userAuthUnif } from "../../config/envConfig";

test.describe("[userAuthUnif] Экран авторизации сотрудника ВАТС (унифицированный)", () => {
  test(" Главная страница + hover кнопки 'Войти'", async ({ page }) => {
    await test.step("Открываем страницу авторизации сотрудника ВАТС (унифицированный вход)", async () => {
      await page.goto(userAuthUnif, { waitUntil: "networkidle" });
      await page.setViewportSize({ width: 1280, height: 800 });
    });

    await test.step("Проверяем видимость кнопки 'Войти'", async () => {
      const loginButton = page.getByRole("button", { name: "Войти", exact: true });
      await expect(loginButton).toBeVisible();
    });

    await test.step("Делаем скриншот всей страницы (статичное состояние)", async () => {
      await expect(page).toHaveScreenshot("auth-user-unif-login-page-static.png", {
        fullPage: true,
      });
    });

    await test.step("Наводим на кнопку 'Войти' и делаем скриншот кнопки", async () => {
      const loginButton = page.getByRole("button", { name: "Войти", exact: true });
      await loginButton.hover();

      const loginHoverBox = await loginButton.boundingBox();
      if (!loginHoverBox) {
        test.fail(true, "Не удалось получить boundingBox для кнопки 'Войти'");
        return;
      }

      await expect(page).toHaveScreenshot("auth-user-unif-login-button-hover.png", {
        fullPage: true,
      });
    });
  });
    });
 