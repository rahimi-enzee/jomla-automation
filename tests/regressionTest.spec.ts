import { test, expect } from "../fixtures/fixture.ts";
import { departmentName, communityName } from "../data/deptCom.ts";
import { rootCertificates } from "tls";

/*
* There will be 5 test in this file, 
* visiting all pages on intranet 
* but with different account and role.
*/

test.describe("Regression test for production/live", () => {
  test.skip("Production", async ({ dashboardPage, loginAsNew }) => {
    test.setTimeout(120_000);
    await loginAsNew("superAdmin");

    const testContext = {
      departmentName: departmentName[3],
      comName: communityName[1],
      role: "superAdmin",
      createCom: false,
    };

    await dashboardPage.allPageCanBeClick(testContext);
  });
});

test.describe("Regression test for tempstaging", () => {
  test("tempstaging", async ({ dashboardPage, loginAs }) => {
    test.setTimeout(120_000);
    await loginAs("admin");

    const testContext = {
      departmentName: departmentName[0],
      comName: communityName[0],
      role: "admin",
      createCom: true,
    };

    await dashboardPage.allPageCanBeClick(testContext);
  });

});
