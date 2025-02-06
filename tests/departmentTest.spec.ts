import { test, expect } from "../fixtures/fixture.ts";

test("first test", async({departmentPage}) => {
    await departmentPage.navigateToandVisible();
});