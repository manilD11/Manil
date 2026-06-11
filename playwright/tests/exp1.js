import { chromium,webkit } from "playwright";

class Swag{
    constructor(page){
        this.page = page;

        this.uName = page.getByPlaceholder("Username");
        this.pass = page.getByPlaceholder("Password");
        this.tbn = page.locator("//input[@ data-test='login-button']")


        this.search = page.getByPlaceholder("Search")
        this.sbtn = page.locator('//button[@title="Search"]')
        this.body = page.locator('body')
        this.first= page.locator("//div[@id='content']").first()
        this.skip = page.locator('.ytp-skip-ad-button');



        this.skip1 = page.locator('.ytp-skip-ad-button');

this.skip2 = page.getByText('Skip');

this.skip3 = page.getByRole('button', { name: 'Skip' });

this.skip4 = page.locator('button.ytp-skip-ad-button');

this.skip5 = page.locator('div.ytp-skip-ad-button__text');

this.skip6 = page.locator('button[id*="skip-button"]');

this.skip7 = page.locator('text=Skip');
    }

    async login(n,p) {
        await this.uName.fill(n)
        await this.pass.fill(p)
        await this.tbn.click()   
    }

    async yt(){
        const title = await this.page.title();
        if (!title.includes('YouTube'))throw new Error("Title Didn't Match");

        await this.search.fill("Playwright");
        await this.page.keyboard.press("Enter");

        await this.page.locator('.ytLockupMetadataViewModelTitle').first().click();
        

        if(!(await this.page.url().includes("watch"))) throw new Error("Not playing");

        console.log(await this.skip.count());
        console.log("skip1", await this.skip1.count());
console.log("skip2", await this.skip2.count());
console.log("skip3", await this.skip3.count());
console.log("skip4", await this.skip4.count());
console.log("skip5", await this.skip5.count());
console.log("skip6", await this.skip6.count());
console.log("skip7", await this.skip7.count());



        if(await this.skip2.isVisible()) await this.skip2.click();


        await this.page.waitForTimeout(3000)
        await this.page.keyboard.press("m")
        await this.page.waitForTimeout(3000)
        await this.page.keyboard.press("f")    
        
    }
}

async function loginTest(){
    const b = await chromium.launch({headless:false})
    const p = await b.newPage()
    
    await p.goto("https://www.saucedemo.com/")
    const title = await p.title();
    if (!title.includes("Swag Labs")){
        throw new Error("Error")
    }

    const p1 = new Swag(p)
    await p1.login("standard_user","secret_sauce")
    console.log("Done");
    await b.close()
}

async function loginError() {
    const b = await webkit.launch({headless:false})
    const p = await b.newPage()

    await p.goto("https://www.saucedemo.com/")
    const l = new Swag(p)
    await l.login("abc","abcd")
    
    const error = await p.locator('//h3[@data-test="error"]').isVisible()
    if(!error) throw new Error("didnt work");
    console.log("passed")
    await b.close()    
}

async function exp(){

    const b = await chromium.launch({headless:false});
    const p = await b.newPage();

    await p.goto("https://youtube.com");
    await b.close()
};

async function youtube() {
    const browser = await chromium.launch({headless:false})
    const page = await browser.newPage()

    await page.goto("https://www.youtube.com/")
    const yt1 = new Swag(page)
    await yt1.yt()

    await page.waitForTimeout(3000)
    console.log("pauseing")
    await page.keyboard.press("Space")

    
    await browser.close()
    console.log("Passed")
    
}

(async()=>{
    // await loginTest();
    // await loginError();
    await youtube();
})();