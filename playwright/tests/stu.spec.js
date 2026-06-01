import {test, expect} from "@playwright/test"


test('Form',async ({page})=>{
    await page.goto("https://demoqa.com/automation-practice-form")

    await expect(page).toHaveTitle("demosite")
    await expect(page.locator("//h5[text()='Student Registration Form']")).toBeVisible()


    await page.getByPlaceholder('First Name').fill("Virat")
    await page.locator("#lastName").fill("Kohli")
    await page.fill('#userEmail',"alone@abc.com")

    await page.locator("#gender-radio-1").click()
    await expect(page.locator("#gender-radio-1")).toBeChecked()

    await page.getByPlaceholder('Mobile Number').fill('9090909090')
    await page.fill('#dateOfBirthInput','12 May 1989')
    await page.locator('#subjectsInput').fill('Maths');
    await page.keyboard.press('Enter');

    await page.locator("#subjectsInput").fill('Comp')
    await page.keyboard.press('Enter')


    const a = page.getByLabel("Sports")
    await a.click()
   const b = page.getByLabel("Music")
   await b.click()

   await expect(a).toBeChecked()
   await expect(b).toBeChecked()

   await page.locator('#uploadPicture').setInputFiles("sample.pdf")

   await page.getByPlaceholder("Current Address").fill("No 123")


await page.locator('#react-select-3-input').fill('NCR');
await page.keyboard.press('Enter');

await page.locator('#react-select-4-input').fill('Delhi');
await page.keyboard.press('Enter');

await page.getByRole("button",{name:'Submit'}).click();

await expect(page.getByText('alone@abc.com')).toBeVisible();

})
