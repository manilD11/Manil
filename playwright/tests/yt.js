import { chromium,webkit } from "playwright";

class YouTube{
    constructor(page){
        this.page = page;
        this.search = page.getByPlaceholder("Search")
        this.sbtn = page.locator('//button[@title="Search"]')
        this.body = page.locator('body')
        this.first= page.locator("//div[@id='content']").first()
    //     this.skip = page.locator('.ytp-skip-ad-button');
    //     this.skip1 = page.locator('.ytp-skip-ad-button .ytp-ad-component--clickable');
    //     this.skip2 = page.locator("//button[@id='skip-button:g']")
    }
   
    async srh(){
        const title = await this.page.title();
        if (!title.includes('YouTube'))throw new Error("Title Didn't Match");

        await this.search.fill("Playwright");
        await this.page.keyboard.press("Enter");

        await this.page.locator('.ytLockupMetadataViewModelTitle').first().click();
        
        if(!(await this.page.url().includes("watch"))) throw new Error("Not playing");

        // console.log(await this.skip.count());
        // this.page.waitForTimeout(10000)
        // console.log(await this.skip.textContent())
        // if(await this.skip.isVisible()) await this.skip.click();

        await this.page.waitForTimeout(3000)
        await this.page.keyboard.press("m")
        await this.page.waitForTimeout(3000)
        await this.page.keyboard.press("f")    
        
    }
}

async function youtube() {
    const browser = await chromium.launch({headless:false})
    const video = await browser.newContext({
        recordVideo:{
            dir:"videos/."
        }
    })
    const page = await video.newPage()
    

    await page.goto("https://www.youtube.com/")
    const yt1 = new YouTube(page)
    await yt1.srh()

    await page.waitForTimeout(3000)
    console.log("pauseing")
    await page.keyboard.press("Space")
    await page.waitForTimeout(3000)

    await browser.close()
    console.log("Passed")
    
}

(async()=>{
    await youtube();
})();