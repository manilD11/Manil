async function getCatFact() {
  const facts = await fetch("https://catfact.ninja/fact",{ cache: "no-store" })
  const data = await facts.json()
  return data.data
  // return facts.json()
}
export default async function Cats(){
  const facts = await getCatFact()
  const date = new Date().toLocaleTimeString()
return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: 600,
        padding: "10px",
        color: "#333",
        background: "#74c2e18f",
        border: "2px solid #00ffff",
  borderRadius: "10px",
      }}
    >
      <h1 style={{
        fontSize: "1rem",
        fontWeight: 20,
        padding: "1px",
        color: "#5900ff",
         position: "absolute",
  top: "10px",
  right: "10px"
      }}>{date}</h1>
     {facts?.map(({ fact }: { fact: string }, index: number) => (
  <div key={index} >
    <p >{fact}</p>
  </div>
))}
    </div>
  );
}