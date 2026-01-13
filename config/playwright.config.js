import { defineConfig } from '@playwright/test';


export default defineConfig({
  workers: 1,
  timeout: 30000,          // общий таймаут теста (30 сек)
  expect: {
   timeout: 25000,        // таймаут для всех expect(locator).toBeVisible и т.п.
 
  },
});