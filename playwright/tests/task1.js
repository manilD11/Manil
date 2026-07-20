import {chromium} from "playwright"
import fs from "fs"
import assert  from "assert/strict"

(async ()=>{
        const link  ="https://txn2.healthfusionclaims.com/electronic/pm/pm_dashboard.jsp"
        const chart = "XXXXXXXXXXXX"

        const b = await chromium.launch({headless:false,slowMo:300})
        const c = await b.newContext({
                storageState:"auth33.json",
        recordVideo:{
            dir:'newTask/.'
        }
})
        const p = await  c.newPage()
        try{
        await p.goto(link)
        assert.match(await p.url(),/dashboard/,"wrong url")
        await p.getByRole("link",{name:"EHR"}).click()
        await p.waitForSelector("#soapContainer")
        await p.locator("#provider").click();
        await p.keyboard.press("Escape"); 
       await p.locator("#soapTabs").locator("#tabSearch").click({force:true})

        await p.waitForSelector("#widgeScrollFix")
        await p.locator("#form1").locator("input[name='chartNO']").fill(chart)
        await p.getByRole("button",{name:"Search Charts"}).click()

        await p.waitForSelector("#patientSearchresultTable")
        await p.getByText(chart, { exact: true }).click()

        await p.waitForSelector("#topNavBackground")
        await p.locator('#topTabs').getByText("Orders").click()
        await p.waitForSelector("#orderResultsDataTable")
        await p.locator("#orderResultsDataTable tr").nth(1).click()
       

        const [print] = await Promise.all([
                c.waitForEvent("page"), 
                p.locator('#orderResultOptions').getByText('Print', { exact: true }).click()
        ])

        await print.waitForLoadState("domcontentloaded")
      


// const [download] = await Promise.all([
//     print.waitForEvent("download"),
//     print.locator("#downloads").locator("#save").click()
// ])

        // await download.saveAs("./NewTask.pdf")
        // console.log("Download complete")
        // await p.waitForTimeout(4000)

        const pdfUrl = print.url()
        const response = await print.context().request.get(pdfUrl)
        const buffer = await response.body()
        fs.writeFileSync('output.pdf', buffer)

        
        }catch(err){
                console.error(`Error:${err.message}`)
                await p.screenshot({path:"ErrorT.png"})
        }finally{
        await b.close()
        console.log("Completed")
        }

})();







