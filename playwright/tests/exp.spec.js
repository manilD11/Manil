import { test,expect } from "@playwright/test";
import reg from "./reg";

class pom {
  constructor(page){
    this.page = page;
    this.sgn = page.getByRole("link",{name: 'Signup / Login'});
    this.name =  page.getByPlaceholder("Name");
    this.email= page.locator('[data-qa="signup-email"]');
    this.btn=page.getByRole("button",{name:'Signup'});

    this.em = page.locator('[data-qa="login-email"]');
    this.pass =page.locator("[data-qa='login-password']");
    this.lbtn = page.getByRole("button",{name:"Login"});
  }

  async reg1(n,em){
    await this.name.fill(n)
    await this.email.fill(em)
    await this.btn.click()
  }

  async login(n,p){
    await this.em.fill(n)
    await this.pass.fill(p)
    await this.lbtn.click()

  }
}
test.describe('login',()=>{

  test.beforeEach('run',async({page})=>{
    
    await page.goto('https://automationexercise.com/')
    await expect(page).toHaveTitle('Automation Exercise')
  })

  test.afterAll('run1',async()=>{
    console.log("All done")
  })
  test.afterEach('run2',async({page})=>{
  console.log("one test done")
})

test.fail("fail",async({page})=>{
  await expect(page).toHaveURL(/lolo/)
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

    const lgn = new pom(page)
    await lgn.login(email,"abc123")
    
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

}) 


class yt{

    constructor(page){
        this.page = page;
        this.srh=  page.getByPlaceholder("Search");
        this.sbtn =  page.locator("#button")

    }

}


test('key',async({page})=>{
    await page.goto("https://www.youtube.com/")
    await expect(page).toHaveTitle(/YouTube/)
    
    const yt1 = new yt(page);

    await yt1.srh.type("RCB AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    await yt1.srh.press("Control+A")
    await yt1.srh.type("Toxic")
    await page.keyboard.press("Enter")

    await expect(page.locator("body")).toContainText("YASH")
})


test.only('key2',async({page})=>{
    await page.goto("https://www.google.com/")
   

    await page.locator("textarea[name='q']").type("Link")
    await page.waitForSelector(".gDtRnb")
    await page.getByText("LinkedIn").nth(1).click()
    // await page.keyboard.press("ArrowDown"
    await page.keyboard.press("Enter")

    await expect(page).toHaveURL(/sorry/)
})