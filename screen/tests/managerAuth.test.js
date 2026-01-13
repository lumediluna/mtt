import { test, expect } from "@playwright/test";
import { userAuth, viewportDesktop } from "../../config/envConfig";

test.describe("[userAuth] Экран авторизации сотрудника ВАТС", () => {
  test("Главная страница + hover кнопки 'Войти'", async ({ page }) => {
    await test.step("Открываем страницу авторизации сотрудника ВАТС", async () => {
      await page.goto(userAuth, { waitUntil: "networkidle" });
      await page.setViewportSize({ viewportDesktop });
    });

    await test.step("Проверяем видимость кнопки 'Войти'", async () => {
      const loginButton = page.getByRole("button", { name: "Войти", exact: true });
      await expect(loginButton).toBeVisible();
    });

    await test.step("Делаем скриншот всей страницы (статичное состояние)", async () => {
      await expect(page).toHaveScreenshot("auth-user-login-page-static.png", {
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

      await expect(page).toHaveScreenshot("auth-user-login-button-hover.png", {
        fullPage: true,
      });
    });
  });
    });







