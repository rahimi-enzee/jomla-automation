import { test, expect } from "../fixtures/fixture.ts";

const post1 = "nama saya bingo";
const post2 = "nama saya bingo miaw miaw";

test.describe("Wall posting", () => {
    test("normal-posting", async ({ page, posting }) => {
        await posting.sendNormalPost(post1, false);
        await page.waitForTimeout(5_000);
        await posting.sendNormalPost(post2, true);
    })

    test("normal-post-visibility", async ({ posting }) => {
        await posting.postVisibility(post1);
        await posting.postVisibility(post2);
    });

    // WIP
    test("delete-post", async ({ posting }) => {
        await posting.deletePost(post1);
    });

})