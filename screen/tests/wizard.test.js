import { test, expect } from "@playwright/test";
import { wizard, viewportDesktop } from "../../config/envConfig";

test.describe("[wizard] Экран саморегистрации ВАТС", () => {
  test(" Главная страница + hover кнопки 'Продолжить'", async ({ page }) => {
    await test.step("Открываем страницу саморегистрации ВАТ", async () => {
      await page.goto(wizard, { waitUntil: "networkidle" });
      await page.setViewportSize( viewportDesktop );
    });

    await test.step("Проверяем видимость кнопки 'Продолжить'", async () => {
      const continueButton = page.getByRole("button", { name: "Продолжить", exact: true });
      await expect(continueButton).toBeVisible();
      });

   await test.step("Заполняем поле ФИО валидными данными", async () => {
      const fioInput = page.getByPlaceholder("Иванов Иван Иванович");
      await fioInput.fill("Тестовый Пользователь");
      });
    
    await test.step("Заполняем поле телефон валидными данными", async () => {
      const telnumInput = page.getByPlaceholder(/^7.*200-50-60$/);
      await telnumInput.fill("+7 (999) 200-50-60");
      });
 

    await test.step("Делаем скриншот всей страницы (статичное состояние)", async () => {
      await expect(page).toHaveScreenshot("wizard-page-static.png", {
        fullPage: true,
      });
    });

    await test.step("Наводим на кнопку 'Продолжить' и делаем скриншот кнопки", async () => {
      const continueButton = page.getByRole("button", { name: "Продолжить", exact: true });
      await continueButton.hover();

      const continueHoverBox = await continueButton.boundingBox();
      if (!continueHoverBox) {
        test.fail(true, "Не удалось получить boundingBox для кнопки 'Продолжить'");
        return;
      }

      await expect(page).toHaveScreenshot("wizard-button-hover.png", {
        fullPage: true,
      });
    });

      
//    await test.step("Прожимаем чек-бокс ознакомление", async () => { 
//       await page.getByText("Ознакомлен с Политикой обработки персональных данных", { exact: false }).click();
//     });

//    await test.step("Прожимаем чек-бокс согласие", async () => {
//   const consentBlock = page.locator('div:has-text("Даю согласие на обработку персональных данных")');
//   await consentBlock.locator(".checkbox").click();
// });

//     await test.step("Кликаем по кнопке 'Продолжить'", async () => {
//       const continueButton = page.getByRole("button", { name: "Продолжить", exact: true });
//       await continueButton.click();

//    await test.step("Экран после клика по кнопке 'Продолжить', при заполненных полях", async () => {
//       await page.waitForTimeout(5000);
//        await expect(page).toHaveScreenshot("after-continue-click.png", {
//         fullPage: true,
//       });
//    })
    //  await expect(page.getByText(/Введите код из/i, { exact: false })).toBeVisible({ timeout: 10000 });
    // });
  });
});