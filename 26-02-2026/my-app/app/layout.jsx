import{Montserrat_Alternates} from "next/font/google"
import Image from "next/image"
import Link from "next/link"


const fontM = Montserrat_Alternates({
  subsets:["latin"],
  display:"swap",
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates"
  
})



export default function app({children}){
  return (
    <html lang="en">
      
      <body className={fontM.className} style={{backgroundColor: "#fbff01",fontFamily:"var(--font-montserrat-alternates)"}}>
        <header style={{display:"flex"}}>
          {/* <Image 
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}

          /> */}
<Link href={"/"} style={{display:"flex"}}>
       <img src="/logo.png" style={{maxwidth:"10px",width:"25%",borderRadius:"90%"}}></img>
       <h1 style={{paddingLeft:"10px", textDecoration:"none"}}>Let's Connect</h1>
       </Link>
       <nav >
        <ul style={{display:"flex", gap: "20px", listStyle: "none",paddingLeft:"1000px" }}>
          <li><Link href={"/"}>HOME</Link></li>
          <li><Link href={"/about"}>About</Link></li>
          <li><Link href={"/about/mission"}>POST</Link></li>
          
        </ul>
       </nav>
      </header>
        {children} 
      </body>
    </html>
  );

}