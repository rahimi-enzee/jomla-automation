import { test, expect } from "../fixtures/fixture.ts";

// NOTE: use this account
// 1. No prior department = "John Doe"
// 2. Existed department = "rahimi-test"
// 3. Two department = "rahimi-qa"

test.describe("Adding member into a department", () => {
  test("staff with no prior department", async ({ departmentPage }) => {
    await departmentPage.addMember("John Doe");
  });

  test("staff with existed department", async ({ departmentPage }) => {
    await departmentPage.addMember("rahimi-test");
  });

  test("staff already in two department", async ({ departmentPage }) => {
    // there's no need to remove member here 
    await departmentPage.addMember("rahimi-qa");
  });

})

