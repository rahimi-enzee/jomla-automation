import { test, chromium, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";

test.describe.serial("Login Multiple Users and Keep Online", () => {
  let contexts: BrowserContext[] = [];

  test.beforeAll(async () => {
    console.log("Logging in users...");

    for (let i = 1; i <= 99; i++) {
      const browser = await chromium.launch(); // Launch a separate browser instance per user
      const context = await browser.newContext(); // Each user gets a new context
      const page = await context.newPage();
      
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await loginPage.navigateToAndVisible();
      await loginPage.startLogin(`fakeuser${i}@email.com`, "123");
      await dashboardPage.navigateToAndVisible();

      contexts.push(context); // Store context to keep session alive
    }

    console.log(`✅ Logged in ${contexts.length} users`);
  });

  test("Users stay online", async ({}) => {
    console.log("Keeping users online...");

    for (const context of contexts) {
      const page = context.pages()[0];

      setInterval(async () => {
        await page.reload(); // Prevent auto-logout
      }, 30000); // Reload every 30s

      setInterval(async () => {
        await page.mouse.move(Math.random() * 500, Math.random() * 500); // Simulate activity
      }, 15000); // Move mouse every 15s
    }

    // Keep the test running for a while (adjust as needed)
    await new Promise((resolve) => setTimeout(resolve, 300000)); // 5 mins
  });

  test.afterAll(async () => {
    console.log("Closing sessions...");
    for (const context of contexts) {
      await context.close();
    }
  });
});
