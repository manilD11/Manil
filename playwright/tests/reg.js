import {expect} from"@playwright/test";


export default async function reg (page,name,email,password){
    await expect(page.getByRole("link",{name: 'Signup / Login'})).toBeVisible()
    await page.getByRole("link",{name: 'Signup / Login'}).click()
    
    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("New User Signup!")).toBeVisible()

    await page.getByPlaceholder("Name").fill(name)
   await page.locator('[data-qa="signup-email"]').fill(email);

    await page.getByRole("button",{name:'Signup'}).click()

    await expect(page).toHaveURL(/signup/)
    await expect(page.getByText("Enter Account Information")).toBeVisible()

    await page.locator("#id_gender1").click()
    await page.fill('#password',password)

    await page.selectOption("#days","3")
    await page.selectOption("#months",'2')
    await page.selectOption("#years",'1999')

    await page.locator("#newsletter").click()
    await expect(page.locator("#newsletter")).toBeChecked()

    await page.locator("#optin").click()
    await expect(page.locator("#optin")).toBeChecked()
    
    await page.fill("#first_name","Rajat")
    await page.fill("#last_name",'Patidar')
    await page.fill("#address1",'Home')
    await page.fill("#state",'Kar')
    await page.fill("#city","Beng")
    await page.fill("#zipcode",'12345')
    await page.fill("#mobile_number",'90909090')

    await page.getByRole("button",{name:"Create Account"}).click()

    await expect(page).toHaveURL(/account_created/)
    await expect(page.getByText("Account Created!")).toBeVisible()

    await page.getByRole("link",{name:'Continue'}).click()

    await expect(page.getByText(`Logged in as ${name}`)).toBeVisible()
   
}