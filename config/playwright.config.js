import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,          // общий таймаут теста (30 сек)
  expect: {
    timeout: 15000,        // таймаут для всех expect(locator).toBeVisible и т.п.
  },
});