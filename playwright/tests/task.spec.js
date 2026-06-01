import {test,expect} from "@playwright/test";
import reg from "./reg";

test.beforeEach(async({page})=>{
    await page.goto("https://automationexercise.com/")
    await expect(page).toHaveTitle('Automation Exercise')   
})

test('Task1-Register User',async({page})=>{
     
    await expect(page.getByRole("link",{name: 'Signup / Login'})).toBeVisible()
    await page.getByRole("link",{name: 'Signup / Login'}).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("New User Signup!")).toBeVisible()

    await page.getByPlaceholder("Name").fill("Rajat")
   await page.locator('[data-qa="signup-email"]').fill('cap@rcb.com');

    await page.getByRole("button",{name:'Signup'}).click()

    await expect(page).toHaveURL(/signup/)
    await expect(page.getByText("Enter Account Information")).toBeVisible()

    await page.locator("#id_gender1").click()
    await page.fill('#password',"abc123")

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

    await expect(page.getByText("Logged in as Rajat")).toBeVisible()
    await expect(page.getByText("Delete Account")).toBeVisible()
    await page.getByText("Delete Account").click()

    await expect(page).toHaveURL(/delete_account/)
    await expect(page.getByText("Account DELETED!")).toBeVisible()

    await page.getByRole("link",{name:'Continue'}).click()

})

test("Task-2 Login",async({page})=>{
    const email = `rajat${Date.now()}@test.com`;
    await reg(page, "Rajat", email, "abc123");


    //login 

    await expect(page.getByRole("link",{name: 'Signup / Login'})).toBeVisible()
    await page.getByRole("link",{name: 'Signup / Login'}).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("Login to your account")).toBeVisible()

    await page.locator('[data-qa="login-email"]').fill(email);//abc@abc2.com
    await page.locator("[data-qa='login-password']").fill("abc123")//12345678

    await page.getByRole("button",{name:"Login"}).click()

    
    await expect(page.getByText("Logged in as Rajat")).toBeVisible()
    await expect(page.getByText("Delete Account")).toBeVisible()
    await page.getByText("Delete Account").click()

    await expect(page).toHaveURL(/delete_account/)
    await expect(page.getByText("Account DELETED!")).toBeVisible()

})

test("Task-3 Error-Login",async({page})=>{
    const email = `rajat${Date.now()}@test.com`;
    await reg(page, "Rajat", email, "abc123");

    //login 

    await expect(page.getByRole("link",{name: 'Signup / Login'})).toBeVisible()
    await page.getByRole("link",{name: 'Signup / Login'}).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("Login to your account")).toBeVisible()

    await page.locator('[data-qa="login-email"]').fill('email@abc.com');
    await page.locator("[data-qa='login-password']").fill("abc123")

    await page.getByRole("button",{name:"Login"}).click()
await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
})

test('Task 4 - Logout', async({page})=>{
    const email = `boss${Date.now()}@abc.com`
    await reg(page,'boss',email,'12345678')
})

test('Task5 -SignUp with same email',async({page})=>{
    await expect(page.getByRole("link",{name: 'Signup / Login'})).toBeVisible()
    await page.getByRole("link",{name: 'Signup / Login'}).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("New User Signup!")).toBeVisible()

    await page.getByPlaceholder("Name").fill("Rajat")
    await page.locator('[data-qa="signup-email"]').fill('abc@abc2.com');

   await page.getByRole("button",{name:'Signup'}).click()
   await expect(page.getByText('Email Address already exist!')).toBeVisible()

})

test.only('Task 6 -',async({page})=>{
    await expect(page.getByText('Contact us')).toBeVisible()
    await page.getByText("Contact us").click()

    await expect(page).toHaveURL(/contact_us/)
    await page.getByPlaceholder('Name').fill("Raju")
    await page.locator('[data-qa="email"]').fill("abcs@io.com")
    await page.getByPlaceholder("Subject").fill("Unable to login")
    await page.getByPlaceholder("Your Message Here").fill("I am unable to login")
    await page.locator('input[name="upload_file"]').setInputFiles("sample.pdf")
    page.once('dialog', async dialog => {
         await dialog.accept();
    });
         
    await page.locator('[data-qa="submit-button"]').click();
    await expect(page.locator('#contact-page .status.alert.alert-success'))
    .toContainText('Success! Your details have been submitted successfully.');
    await page.getByRole('link', { name: ' Home' }).click();
    await expect(page.getByText('Brands')).toBeVisible()
})

