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

test('Task 6 -',async({page})=>{
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

test('Task 7- Verify Test case page',async({page})=>{
    await page.getByRole('link',{name:'Test Cases'}).first().click()
    await expect(page).toHaveURL(/test_cases/)
})

test('Task 8- Verify Product',async({page})=>{
    await page.getByRole('link',{name:'Products'}).first().click()
    await expect(page).toHaveURL(/products/)
    await expect(page.locator(".product-image-wrapper").first()).toBeVisible();
    await expect(page.locator(".product-image-wrapper").last()).toBeVisible();

    await page.getByRole('link',{name:'View Product'}).first().click()

    await expect(page).toHaveURL(/product_details/)

    await expect(page.locator('.product-information h2')).toBeVisible();
    await expect(page.locator('.product-information')).toContainText('Category');
    await expect(page.locator('.product-information')).toContainText('Rs.');
    await expect(page.locator('.product-information')).toContainText('Availability');
    await expect(page.locator('.product-information')).toContainText('Condition');
    await expect(page.locator('.product-information')).toContainText('Brand');

})

test('Task 9 - Search',async({page})=>{
    await page.getByRole('link',{name:'Products'}).first().click()
    await expect(page).toHaveURL(/products/)

    await page.fill('#search_product','Top')
    await page.locator("#submit_search").click()

    await expect(page).toHaveURL(/search/)
    await expect(page.getByText('Searched Products')).toBeVisible()
    console.log(await page.locator('.single-products p').allTextContents())
    const prod= await page.locator('.single-products p').count()
    console.log(`count:${prod}`)
    await expect(prod).toBeGreaterThan(0)

})

test('Task 10 - Subcribe 1',async ({page})=>{

    await expect(page.getByRole("heading",{name:'Subscription'})).toBeVisible()
    await page.fill("#susbscribe_email","abc@io.com")
    await page.locator("#subscribe").click()
    await expect(page.getByText('You have been successfully subscribed!')).toBeVisible()
})

test(' Task 11 - Subscribe 2', async({page})=>{
    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)

    await expect(page.getByRole("heading",{name:'Subscription'})).toBeVisible()
    await page.fill("#susbscribe_email","abc@io.com")
    await page.locator("#subscribe").click()
    await expect(page.getByText('You have been successfully subscribed!')).toBeVisible()

})

test.only('Task 12 - Add to cart', async({page})=>{
    await page.getByRole('link',{name:'Products'}).first().click()
    await expect(page).toHaveURL(/products/)

    await page.locator(".single-products").first().hover()
    await expect(page.locator('.product-overlay .add-to-cart[data-product-id="1"]')).toBeVisible()
    await page.locator('.product-overlay .add-to-cart[data-product-id="1"]').click()

    await expect(page.locator('.modal-content')).toBeVisible();
    await page.getByText('Continue Shopping').click()


    await page.locator(".single-products").nth(1).hover()
    await expect(page.locator('.product-overlay .add-to-cart[data-product-id="2"]')).toBeVisible()
    await page.locator('.product-overlay .add-to-cart[data-product-id="2"]').click()

    await expect(page.locator('.modal-content')).toBeVisible();

    await page.getByRole('link',{name:'View Cart'}).click()

    await expect(page).toHaveURL(/view_cart/)
    await expect(page.locator('#cart_info_table')).toBeVisible()

    await expect(page.locator("#product-1")).toBeVisible()
    await expect(page.locator("#product-2")).toBeVisible()

    await expect(page.getByText('Blue Top')).toBeVisible()
    await expect(page.getByText('Men Tshirt')).toBeVisible()

	
    await expect(page.locator('#product-1 .cart_price')).toContainText('Rs.')
    await expect(page.locator('#product-1 .cart_quantity')).toContainText('1')
    await expect(page.locator('#product-1 .cart_total_price')).toContainText('Rs.')
    
    await expect(page.locator('#product-2 .cart_price')).toContainText('Rs.')
    await expect(page.locator('#product-2 .cart_quantity')).toContainText('1')
    await expect(page.locator('#product-2 .cart_total_price')).toContainText('Rs.')
  
})