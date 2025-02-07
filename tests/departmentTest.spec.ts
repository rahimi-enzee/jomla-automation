import { test, expect } from "../fixtures/fixture.ts";

test("plus member into department", async({departmentPage}) => {
    await departmentPage.addMember("John Doe");
    // await departmentPage.addMember("John Doe");
})