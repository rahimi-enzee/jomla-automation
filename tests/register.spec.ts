import { test, expect } from "../fixtures/fixture.ts";
import { LoginPage } from "../pages/login.ts";
import { DashboardPage } from "../pages/dashboard.ts";
// FORMAT
// fakeUsern -> name
// fakeusern@email.com -> n will be the number from 2 to 110
// 123
// 123

for (let i = 6; i <= 101; i++) {
  test(`register multiple member - ${i}`, async ({ registerPage }) => {
    await registerPage.navigateTo();
    await registerPage.newRegister(`fakeUser${i}`, `fakeuser${i}@email.com`, "123");
    console.log(`fakeUser${i} created`);
  });
};


// for (let i = 1; i < 3; i++) {
//   test(`login multiple ${i}`, async ({loginPage, dashboardPage}) => {
//     await loginPage.navigateToAndVisible();
//     await loginPage.startLogin(`fakeuser${i}@email.com`, "123");
//     await dashboardPage.navigateToAndVisible();

//   });
// }

test.describe.parallel("Login Multiple Users", () => {
  for (let i = 1; i <= 99; i++) {
    test(`login multiple ${i}`, async ({ loginPage, dashboardPage, page }) => {
      await loginPage.navigateToAndVisible();
      await loginPage.startLogin(`fakeuser${i}@email.com`, "123");
      await dashboardPage.navigateToAndVisible();
      await page.pause();
    });
  }
});

