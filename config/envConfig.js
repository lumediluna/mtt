
// ======= ОБЩИЕ НАСТРОЙКИ =======
export const managerAuth = 'https://manager.itoolabs-stage2.exolve.ru/'; //указать нужный стенд
export const userAuth = 'https://exolve752439.itoolabs-stage2.exolve.ru/'; // указать нужный адрес конечного домена
export const userAuthUnif = 'https://itoolabs-stage2.exolve.ru/'
export const DEFAULT_WAIT_UNTIL = 'networkidle';
export const viewportDesktop = {
  width: 1280,
  height: 800,
};

// Таймауты (если нужно централизовать)
export const DEFAULT_TEST_TIMEOUT = 80_000; // мс
export const DEFAULT_EXPECT_TIMEOUT = 80_000; // мс

// ======= АВТОРИЗАЦИЯ MANAGER =======

// // URL страницы авторизации (если меняется роут, правим только здесь)
// export const MANAGER_AUTH_PATH = '/#/';
// export const MANAGER_AUTH_URL = `${managerAuth}${MANAGER_AUTH_PATH}`;


// // Тексты/названия элементов
// export const AUTH_LOGIN_BUTTON_NAME = 'Войти';
// export const AUTH_RESTORE_TEXT = 'Восстановление пароля';

// // Имена скриншотов для auth (можно менять префиксы/папки тут)
// export const AUTH_SCREEN_LOGIN_STATIC = 'manager-login-static.png';
// export const AUTH_SCREEN_LOGIN_HOVER = 'manager-login-hover.png';
// export const AUTH_SCREEN_RESTORE_STATIC = 'manager-restore-static.png';
// export const AUTH_SCREEN_RESTORE_HOVER = 'manager-restore-hover.png';

// ======= ПРИМЕР для других разделов (потом добавишь) =======
// export const BILLING_BASE_PATH = '/billing';
// export const BILLING_MAIN_URL = `${BASE_URL}${BILLING_BASE_PATH}`;
// export const BILLING_MAIN_TITLE = 'Биллинг';
// ...