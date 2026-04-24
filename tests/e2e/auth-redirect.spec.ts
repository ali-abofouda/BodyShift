import { expect, test } from "@playwright/test";

test("unauthenticated user is redirected from dashboard", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/auth/);
});
