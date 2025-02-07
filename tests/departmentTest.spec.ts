import { test, expect } from "../fixtures/fixture.ts";

test("plus member into department", async({departmentPage}) => {
    await departmentPage.visitDepartment("new department");
    await departmentPage.addMember("John Doe");
})