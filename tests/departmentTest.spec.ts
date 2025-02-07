import { test, expect } from "../fixtures/fixture.ts";

test("test all pages in department can be click", async({departmentPage}) => {
    await departmentPage.navigateToandVisible();
    await departmentPage.visitDepartment("tester departmentss");
    await departmentPage.allPageCanBeClick();
});