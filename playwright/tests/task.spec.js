import {test,expect} from "@playwright/test";
import reg from "./reg";
import { link } from "node:fs";
import { exec } from "node:child_process";

test.setTimeout(60000) 
test.beforeEach(async({page, context})=>{
    await context.clearCookies()
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
    await page.getByText("Logout").click()


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
    await expect(page.getByText("Delete Account")).toBeVisible()
    await page.getByText("Delete Account").click()

    await expect(page).toHaveURL(/delete_account/)
    await expect(page.getByText("Account DELETED!")).toBeVisible()

})

test("Task-3 Error-Login",async({page})=>{
    const email = `rajat${Date.now()}@test.com`;
    await reg(page, "Rajat", email, "abc123");
    await page.getByText("Logout").click()

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
    await page.getByText("Logout").click()
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

test('Task 6 - Contact form',async({page})=>{
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
    console.log(await page.locator('.single-products p').allTextContents('Top'))
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

test('Task 12 - Add to cart', async({page})=>{
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

test('Task 13 - Prod quantity',async({page})=>{
    await page.getByRole('link',{name:'View Product'}).nth(5).click()
    await expect(page).toHaveURL(/product_details/)

    await page.locator('#quantity').fill('4')
    await page.getByRole('button',{name:' Add to cart'}).click()

    await expect(page.locator('.modal-content')).toBeVisible()
    await page.getByRole('link',{name:'View Cart'}).click()
    await expect(page).toHaveURL(/view_cart/)

    await expect(page.locator('#cart_info')).toBeVisible()
    await expect(page.locator('#product-6 .cart_quantity')).toContainText('4') 
})

test('Test 14 - regiester while checout', async({page})=>{
 
    await expect(page.locator('.single-products .add-to-cart[data-product-id="1"]').first()).toBeVisible()
    await page.locator('.single-products .add-to-cart[data-product-id="1"]').first().click()

   
    await expect(page.locator('.modal-content')).toBeVisible()
    await page.getByRole('button',{name:'Continue Shopping'}).click()

    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)
    await expect(page.locator('#cart_info')).toBeVisible()

    await page.getByText('Proceed To Checkout').click()

    await expect(page.locator('.modal-content')).toContainText("Register / Login account to proceed on checkout.")
    await page.getByRole('link',{name:'Register / Login'}).click()

    const email = `rajat${Date.now()}@test.com`;
    await reg(page, "Rajat", email, "abc123");

    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)
    await page.getByText('Proceed To Checkout').click()
    await expect(page).toHaveURL(/checkout/)

    await expect(page.locator('#address_delivery')).toContainText('Your delivery address')
    await expect(page.locator('#address_invoice')).toContainText('Your billing address')

    await expect(page.locator('#cart_info')).toBeVisible()

    await page.locator('.form-control').fill("Call before coming")
    await page.getByRole('link',{name:'Place Order'}).click()

    await expect(page).toHaveURL(/payment/)

    await page.locator('[data-qa="name-on-card"]').fill('Raju')
    await page.locator('[data-qa="card-number"]').fill('123456789')
    await page.locator('[data-qa="cvc"]').fill('232')
    await page.locator('[data-qa="expiry-month"]').fill('4')
    await page.locator('[data-qa="expiry-year"]').fill('2029')

    await page.getByText('Pay and Confirm Order').click()
    // await expect(page.locator('#success_message')).toContainText('Your order has been placed successfully!')
    await expect(page).toHaveURL(/payment_done/)

    await expect(page.getByText("Delete Account")).toBeVisible()
    await page.getByRole('link',{name:'Delete Account'}).click()

    await expect(page).toHaveURL(/delete_account/)
    await expect(page.getByText("Account DELETED!")).toBeVisible()
    await page.getByRole("link",{name:'Continue'}).click()
})

test('Task-15 before checkout', async({page})=>{

    const email = `rajat${Date.now()}@test.com`;
    await reg(page, "Rajat", email, "abc123");

    await expect(page.locator('.single-products .add-to-cart[data-product-id="1"]').first()).toBeVisible()
    await page.locator('.single-products .add-to-cart[data-product-id="1"]').first().click()

   
    await expect(page.locator('.modal-content')).toBeVisible()
    await page.getByRole('button',{name:'Continue Shopping'}).click()

    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)
    await expect(page.locator('#cart_info')).toBeVisible()

    await page.getByText('Proceed To Checkout').click()
    await expect(page).toHaveURL(/checkout/)

    await expect(page.locator('#address_delivery')).toContainText('Your delivery address')
    await expect(page.locator('#address_invoice')).toContainText('Your billing address')

    await expect(page.locator('#cart_info')).toBeVisible()

    await page.locator('.form-control').fill("Call before coming")
    await page.getByRole('link',{name:'Place Order'}).click()

    await expect(page).toHaveURL(/payment/)

    await page.locator('[data-qa="name-on-card"]').fill('Raju')
    await page.locator('[data-qa="card-number"]').fill('123456789')
    await page.locator('[data-qa="cvc"]').fill('232')
    await page.locator('[data-qa="expiry-month"]').fill('4')
    await page.locator('[data-qa="expiry-year"]').fill('2029')

    await page.getByText('Pay and Confirm Order').click()
    // await expect(page.locator('#success_message')).toContainText('Your order has been placed successfully!')
    await expect(page).toHaveURL(/payment_done/)

    await expect(page.getByText("Delete Account")).toBeVisible()
    await page.getByRole('link',{name:'Delete Account'}).click()

    await expect(page).toHaveURL(/delete_account/)
    await expect(page.getByText("Account DELETED!")).toBeVisible()
    await page.getByRole("link",{name:'Continue'}).click()

})

test('Task-16 login', async({page})=>{
 
    const email = `rajat${Date.now()}@test.com`;
    await reg(page, "Rajat", email, "abc123");
    await page.getByText("Logout").click()

    await expect(page.getByRole("link",{name: 'Signup / Login'})).toBeVisible()
    await page.getByRole("link",{name: 'Signup / Login'}).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("Login to your account")).toBeVisible()

    await page.locator('[data-qa="login-email"]').fill(email);
    await page.locator("[data-qa='login-password']").fill("abc123")

    await page.getByRole("button",{name:"Login"}).click()

    await expect(page.locator('.single-products .add-to-cart[data-product-id="1"]').first()).toBeVisible()
    await page.locator('.single-products .add-to-cart[data-product-id="1"]').first().click()

   
    await expect(page.locator('.modal-content')).toBeVisible()
    await page.getByRole('button',{name:'Continue Shopping'}).click()

    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)
    await expect(page.locator('#cart_info')).toBeVisible()

    await page.getByText('Proceed To Checkout').click()
    await expect(page).toHaveURL(/checkout/)

    await expect(page.locator('#address_delivery')).toContainText('Your delivery address')
    await expect(page.locator('#address_invoice')).toContainText('Your billing address')

    await expect(page.locator('#cart_info')).toBeVisible()

    await page.locator('.form-control').fill("Call before coming")
    await page.getByRole('link',{name:'Place Order'}).click()

    await expect(page).toHaveURL(/payment/)

    await page.locator('[data-qa="name-on-card"]').fill('Raju')
    await page.locator('[data-qa="card-number"]').fill('123456789')
    await page.locator('[data-qa="cvc"]').fill('232')
    await page.locator('[data-qa="expiry-month"]').fill('4')
    await page.locator('[data-qa="expiry-year"]').fill('2029')

    await page.getByText('Pay and Confirm Order').click()
    await expect(page).toHaveURL(/payment_done/)

    await expect(page.getByText("Delete Account")).toBeVisible()
    await page.getByRole('link',{name:'Delete Account'}).click()

    await expect(page).toHaveURL(/delete_account/)
    await expect(page.getByText("Account DELETED!")).toBeVisible()
    await page.getByRole("link",{name:'Continue'}).click()

})

test('Task-17 remove item ',async({page})=>{
    await expect(page.locator('.single-products .add-to-cart[data-product-id="1"]').first()).toBeVisible()
    await page.locator('.single-products .add-to-cart[data-product-id="1"]').first().click()
    await page.getByText('Continue Shopping').click()

    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)
    await expect(page.locator('#cart_info_table')).toBeVisible()

    await page.locator('.cart_quantity_delete').click()
    await expect(page.getByText('Cart is empty!')).toBeVisible()
    await expect(page.locator('#cart_info_table')).not.toBeVisible()
})

test('Task 18 - Category', async ({ page })=>{
    await expect(page.locator('.left-sidebar')).toContainText('Category')

    await page.getByRole('link', { name: ' Women' }).first().click()
    await expect(page.locator('.panel-body').first()).toBeVisible()
    await page.locator('.panel-body').first().getByText('Dress').click()
    await expect(page.getByText('Women - Dress Products')).toBeVisible()

    await page.getByRole('link', { name: ' Men' }).click()
    await page.getByRole('link',{name:'Tshirts'}).click()
    await expect(page.getByText('Men - Tshirts Products')).toBeVisible()
})

test('Task 19 - brand',async({page})=>{
    await page.getByRole('link',{name:'Products'}).first().click()
    await expect(page).toHaveURL(/products/)

    await expect(page.locator('.brands_products')).toBeVisible()
    await expect(page.locator('.left-sidebar')).toContainText('Brands')

    await page.getByRole('link',{name:'Polo'}).click()
    await expect(page).toHaveURL(/Polo/)
    await expect(page.locator(".features_items")).toContainText('Brand - Polo Products')

    await page.getByRole('link',{name:'H&M'}).click()
    await expect(page).toHaveURL(/H&M/)
    await expect(page.locator(".features_items")).toContainText('Brand - H&M Products')

})

test("Task 20 - search and cart",async({page})=>{
    await page.getByRole('link',{name:'Products'}).first().click()
    await expect(page).toHaveURL(/products/)
    await expect(page.locator(".features_items")).toContainText('All Products')

    await page.fill("#search_product","Top")
    await page.locator("#submit_search").click()

    await expect(page).toHaveURL(/search/)
    await expect(page.getByText('Searched Products')).toBeVisible()
    
    const prod1= await page.locator('.single-products p').count()
   
    await expect(prod1).toBeGreaterThan(0)

    const prod = page.locator('.single-products .add-to-cart');
    const count = await prod.count()

for(let i = 0; i < 5; i++) {

    await page.locator('.single-products').nth(i).hover()

    await page.locator('.product-overlay .add-to-cart').nth(i).click()

    await page.getByRole('button', { name: 'Continue Shopping'}).click()
}


    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)

    await expect(page.locator('#cart_info_table')).toBeVisible()

    const item = page.locator('#cart_info_table .cart_description h4')
    const c = await item.count()

    for(let i=0;i<c;i++){
        await  expect(item.nth(i)).toContainText('Top')
    }

    const email = `rajat${Date.now()}@test.com`;
    await reg(page, "Rajat", email, "abc123");
    await page.getByText("Logout").click()


    await expect(page.getByRole("link",{name: 'Signup / Login'})).toBeVisible()
    await page.getByRole("link",{name: 'Signup / Login'}).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("Login to your account")).toBeVisible()

    await page.locator('[data-qa="login-email"]').fill(email);
    await page.locator("[data-qa='login-password']").fill("abc123")

    await page.getByRole("button",{name:"Login"}).click()

    
    await expect(page.getByText("Logged in as Rajat")).toBeVisible()


    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)

    await expect(page.locator('#cart_info_table')).toBeVisible()

    const item1 = page.locator('#cart_info_table .cart_description h4')
    const c1 = await item1.count()

    for(let i=0;i<c1;i++){
        await  expect(item.nth(i)).toContainText('Top')
    }
})

test("Task 21 - Add Review",async({page})=>{

    await page.getByRole('link',{name:'Products'}).first().click()
    await expect(page).toHaveURL(/products/)
    await expect(page.locator(".features_items")).toContainText('All Products')

    await expect(page.getByRole('link',{name:'View Product'}).first()).toBeVisible()
    await page.getByRole('link',{name:'View Product'}).first().click()
    await expect(page).toHaveURL(/product_details/)

    await expect(page.getByRole('link',{name:"Write Your Review"})).toBeVisible()
    await page.getByPlaceholder('Your Name').fill("Raju")
    await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill("abc@nop.com")
    await page.getByPlaceholder('Add Review Here!').fill("not nice")

    await page.getByRole('button',{name:'Submit'}).click()
    // await expect(page.locator(".alert-success alert")).toBeVisible()
    await expect(page.getByText("Thank you for your review.")).toBeVisible()

})

test('Task - 22 scroll and recomd',async({page})=>{
    await page.locator('.recommended_items').scrollIntoViewIfNeeded()
    await expect(page.getByText('recommended items')).toBeVisible()

    await page.locator('#recommended-item-carousel .add-to-cart[data-product-id="1"]').click()
    await page.getByText('Continue Shopping').click()

    await page.getByText('Cart').first().click()
    await expect(page).toHaveURL(/view_cart/)

    await expect(page.locator('#cart_info_table')).toBeVisible()
    await expect(page.locator('#product-1')).toBeVisible()
})

test('Test - 23 verify address',async({page})=>{
    const email = `boss${Date.now()}@abc.com`
    await reg(page,'Raju',email,"123456")

    await page.locator('.single-products .add-to-cart[data-product-id="1"]').first().click()
    await page.getByText('Continue Shopping').click()

    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)

    await page.getByText("Proceed To Checkout").click()
    await expect(page).toHaveURL(/checkout/)
    
    await expect(page.locator('#address_delivery')).toContainText('Home')
    await expect(page.locator('#address_delivery')).toContainText('Beng')
    await expect(page.locator('#address_delivery')).toContainText('Kar')
    await expect(page.locator('#address_delivery')).toContainText('12345')
    await expect(page.locator('#address_delivery .address_country_name')).toContainText('India')

    
    await expect(page.locator('#address_invoice')).toContainText('Home')
    await expect(page.locator('#address_invoice')).toContainText('Beng')
    await expect(page.locator('#address_invoice')).toContainText('Kar')
    await expect(page.locator('#address_invoice')).toContainText('12345')  
    await expect(page.locator('#address_invoice .address_country_name')).toContainText('India')


    await expect(page.getByText("Delete Account")).toBeVisible()
    await page.getByText("Delete Account").click()
    await expect(page).toHaveURL(/delete_account/)
    await expect(page.getByText("Account DELETED!")).toBeVisible()

    await page.getByRole("link",{name:'Continue'}).click()

})

test('Task 24 - Download Invoice',async({page})=>{

    await page.locator('.single-products .add-to-cart[data-product-id="1"]').first().click()
    await page.getByText('Continue Shopping').click()

    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)

    await page.getByText("Proceed To Checkout").click()
    await page.getByRole('link',{name:'Register / Login'}).click()

    const email = `boss${Date.now()}@abc.com`
    await reg(page,'Raju',email,"123456")

    await page.getByRole('link',{name:'Cart'}).first().click()
    await expect(page).toHaveURL(/view_cart/)

    await expect(page.locator('#cart_info_table')).toBeVisible()
    await expect(page.locator("#product-1")).toBeVisible()

    await page.getByText("Proceed To Checkout").click()
    await expect(page).toHaveURL(/checkout/)
    
    await expect(page.locator('#address_delivery')).toContainText('Home')
    await expect(page.locator('#address_delivery')).toContainText('Beng')
    await expect(page.locator('#address_delivery')).toContainText('Kar')
    await expect(page.locator('#address_delivery')).toContainText('12345')
    await expect(page.locator('#address_delivery .address_country_name')).toContainText('India')



    await page.locator('.form-control').fill("Call before coming")
    await page.getByRole('link',{name:'Place Order'}).click()

    await expect(page).toHaveURL(/payment/)

    await page.locator('[data-qa="name-on-card"]').fill('Raju')
    await page.locator('[data-qa="card-number"]').fill('123456789')
    await page.locator('[data-qa="cvc"]').fill('232')
    await page.locator('[data-qa="expiry-month"]').fill('4')
    await page.locator('[data-qa="expiry-year"]').fill('2029')

    await page.getByText('Pay and Confirm Order').click()
    // await page.waitForTimeout(2000)
    // await expect(page.getByText('Your order has been placed successfully!')).toBeVisible()
    await expect(page).toHaveURL(/payment_done/)
    
    const dnld = page.waitForEvent('download')
    await page.getByRole('link',{name:'Download Invoice'}).click()
    const download = await dnld;
    
    console.log(download.suggestedFilename());
    await expect(download.suggestedFilename()).toBeTruthy();
    
    
    await page.getByRole("link",{name:'Continue'}).click()
    await expect(page.getByText("Delete Account")).toBeVisible()
    await page.getByRole('link',{name:'Delete Account'}).click()

    await expect(page).toHaveURL(/delete_account/)
    await expect(page.getByText("Account DELETED!")).toBeVisible()
    await page.getByRole("link",{name:'Continue'}).click()
})

test('Task 25 - Scroll down', async({page})=> {
    await page.getByText('Subscription').scrollIntoViewIfNeeded()
    await expect(page.getByText('Subscription')).toBeVisible()
    await page.locator('#scrollUp').click()

    await expect(page.getByRole("heading",{name:'Full-Fledged practice website for Automation Engineers'})).toBeVisible()
    
})

test('Task 26 - Scroll down 2', async({page})=> {
    await page.getByText('Subscription').scrollIntoViewIfNeeded()
    await expect(page.getByText('Subscription')).toBeVisible()
     
    await page.getByRole("heading",{name:'Full-Fledged practice website for Automation Engineers'}).scrollIntoViewIfNeeded()
    await expect(page.getByRole("heading",{name:'Full-Fledged practice website for Automation Engineers'})).toBeVisible()
    
})