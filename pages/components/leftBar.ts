import { expect, type Locator, type Page } from "@playwright/test";

export class LeftBar {
    readonly page: Page;
    readonly staffDirectory: Locator;
    readonly community: Locator;
    readonly department: Locator;
    readonly settings: Locator;
    readonly dashboardHome: Locator;
    readonly calendar: Locator;
    readonly fileManagement: Locator;
    readonly media: Locator;
    readonly linkHome: Locator;
    readonly logoutDashboard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.staffDirectory = page.getByRole('link', { name: 'Staff Directory Staff' });
        this.community = page.getByRole('link', { name: 'Community' });
        this.department = page.getByRole('link', { name: 'Department Department' });
        this.settings = page.getByRole("link", { name: 'Settings Settings' });
        this.dashboardHome = page.getByRole('link', { name: 'Dashboard Dashboard' });
        this.calendar = this.page.getByRole('link', { name: 'Calendar Calendar' });
        this.fileManagement = this.page.getByRole('link', { name: 'File Management File' });
        this.media = page.getByRole('link', { name: 'Media Media' });
        this.linkHome = page.getByRole('link', { name: 'Link Link' });
        this.logoutDashboard = page.getByRole('link', { name: 'Logout Logout' });
    }

    async navigateToStaffDirectory() {
        await this.staffDirectory.click();
    }

    async navigateToCommunity() {
        await this.community.click();

        await expect(this.page.getByRole('heading', { name: 'Search Communities' })).toBeVisible();
        await expect(this.page.getByText('All', { exact: true })).toBeVisible();
        console.log("PASSED: Search communities and All drop down visible");
    };

    async navigateToDepartment() {
        await this.department.click();
    }

    async navigateToSettings() {
        await this.settings.click();
    }

    async navigateToDashboardHome() {
        await this.dashboardHome.click();
        await expect(this.page.getByRole('heading', { name: 'My Wall' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Advertisement' })).toBeVisible();
        console.log("PASSED: Dashboard header and advertisement visible.");
    }

    async navigateToCalendar() {
        if (await this.calendar.isVisible()) {
            await this.calendar.click()
            await expect(this.page.getByRole('button', { name: 'Today' })).toBeVisible();
            await expect(this.page.getByLabel('Sunday')).toBeVisible();
            console.log("PASSED: Today and Sunday visible.");
        } else {
            console.log("PASSED WITH CONDITION: Super Admin disabled calendar feature.");
        }
    }

    async navigateToFileManagement() {
        await this.fileManagement.click();
        await expect(this.page.getByRole('heading', { name: 'Search Files' })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'File Name' })).toBeVisible();
        console.log("PASSED: Search Files and File Name visible.");
    }

    // status should be Create or Cancel only
    async addTag(tagName: string, status: string) {
        await this.page.getByRole('button', { name: 'Manage Album' }).click();
        console.log("PASSED: Manage Album button visible and clicked.");

        const addBtn = this.page.getByRole('button', { name: '+ Add' });
        await expect(async () => {
            await addBtn.click();
        }).toPass({ intervals: [1_000, 2_000, 3_000, 4_000, 5_000], timeout: 120_000 });

        await this.page.getByRole('textbox', { name: 'Enter album name' }).fill(tagName);
        await this.page.getByRole('button', { name: status }).click();
        console.log(`PASSED: ${tagName} created.`);
    }

    async removeTag(tagName: string) {
        // await expect(async () => {
        //     await expect(this.page.getByRole('button', { name: new RegExp(`^${tagName} Delete$`) })).toBeVisible();
        //     await this.page.getByRole('button', { name: new RegExp(`^${tagName} Delete$`) }).click();
        //     await this.page.getByRole('button', { name: 'Yes' }).click();
        //     console.log(`PASSED: ${tagName} deleted.`);

        // }).toPass({
        //     intervals: [1_000, 2_000, 3_000, 4_000, 5_000],
        //     timeout: 120_000
        // });
        await this.page.locator('tr', { hasText: tagName }).locator('button:text("Delete")').click();

        await this.page.getByRole('button', { name: 'Yes' }).click();
        console.log(`PASSED: ${tagName} deleted.`);
    }

    // Fixme: this is hard code!
    async addAndRemoveTag(tagName: string) {
        await this.addTag(tagName, "Create");
        // await this.removeTag(tagName);
        await this.page.getByRole('button', { name: 'testTag Delete' }).getByRole('button').click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
    };

    async navigateToMedia(role: string) {
        await this.media.click();
        await expect(this.page.getByRole('heading', { name: 'Images' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Videos' })).toBeVisible();
        // for super admin, we can manage album
        // add new image tags, and delete the tags
        if (role === "admin") {
            await this.addAndRemoveTag("testTag");
        } else if (role === "superAdmin") {
            await this.addTag("testTag", "Cancel");
        }
        console.log("PASSED: Images and Videos visible");
    };

    async navigateToLinkHome() {
        await this.linkHome.click();
        await expect(this.page.getByRole('heading', { name: 'Systems' })).toBeVisible();
        // await expect(this.page.getByRole('link', { name: 'Dashboard Tourism Malaysia' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'e-Library favicon e-Library' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Sistem Kehadiran Pejabat favicon' })).toBeVisible();

        await expect(this.page.getByRole('heading', { name: 'Official File' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Arahan Kewangan Dan' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Rujukan Fail favicon Rujukan' })).toBeVisible();
        await expect(this.page.getByRole('list').filter({ hasText: 'Arahan Kewangan Dan' }).getByRole('button')).toBeVisible();

        console.log("PASSED: Systems and Official File visible");
    }

    async navigateToLogout() {
        await this.logoutDashboard.click();
        console.log("PASSED: LOGOUT.");
    }
}
