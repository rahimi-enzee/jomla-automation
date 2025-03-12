import { expect, type Locator, type Page } from "@playwright/test";
import { DashboardPage } from "./dashboard";
import { StaffDirectoryPage } from "./staffDirectory";

export class ProfilePage {
    readonly page: Page;
    dashboardPage: DashboardPage;
    staffDir: StaffDirectoryPage;

    cropBtn: Locator;
    saveBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.staffDir = new StaffDirectoryPage(page);

        this.cropBtn = this.page.getByRole('button', { name: 'Crop' });
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
    };


    async navigateTo() {
        await this.dashboardPage.profileBtn.click();
        await this.dashboardPage.ownProfile.click();
    };

    private imgEditBtn(profileName: string) {
        return this.page.getByRole('img', { name: new RegExp(`^${profileName}'s profile picture$`) });
    };

    async changeProfilePicture() {
        const beforeEditSrc = await this.imgEditBtn("fakeUser69").getAttribute('src');
        console.log(beforeEditSrc);
        await this.imgEditBtn("fakeUser69").click();

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.getByText('Choose photo from gallery').click()
        ]);

        await fileChooser.setFiles('data/pictures/profilePicture.png');

        await this.cropBtn.click();
        await this.saveBtn.click();

        const afterEditSrc = await this.imgEditBtn("fakeUser69").getAttribute('src');
        console.log(afterEditSrc);

        console.log("Profile picture changed successfully");
    };

    // change date of birth and whatsapp number
    // format of dob: yyyy-mm-dd
    // format of whatsapp number: +60 11-1111-1111
    // changing staff photo will sent a request to the super admin
    async changeBioInformation(dob: string, whatsappNumber: string) {
        await this.page.locator('section').filter({ hasText: 'Bio InformationStaff’s photo?' }).getByRole('button').click();

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.locator('input[type="file"]').click()
        ]);

        await fileChooser.setFiles('data/pictures/staffPhoto.jpg');
        await this.cropBtn.click();
        await this.saveBtn.nth(1).click();

        await this.page.getByPlaceholder('Date of Birth').fill(dob);
        await this.page.getByRole('textbox', { name: '1 (702) 123-' }).fill(whatsappNumber);
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByRole('alert')).toBeVisible();
    };

    async changeDepartmentInfo() {

        // navigation
        await this.navigateTo();
        await this.dashboardPage.staffDirectory.click();
        await this.staffDir.clickOnMemberName("fakeuser69");

        // editing data
        await this.page.getByRole('button', { name: 'Edit Icon' }).nth(1).click();

        // await this.page.locator('select[name="unit"]').selectOption('594');
        await this.page.locator('select[name="unit"]').click();
        await this.page.locator('select[name="jobtitle"]').selectOption('6');
        await this.page.locator('select[name="position"]').selectOption('Tetap');
        await this.page.locator('select[name="grade"]').selectOption('116');
        await this.page.locator('select[name="subgrade"]').selectOption('(KUP) (Memangku)');
        await this.page.locator('select[name="report_to"]').selectOption('');

        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.getByRole('alert')).toBeVisible();


    }

};
