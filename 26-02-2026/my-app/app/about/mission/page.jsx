
// export default async function mission(){
//     // const res = await fetch("https://dummyjson.com/users")
//     // const data = await res.json()

//     // return (<pre>{JSON.stringify(data.users.map(u=>u.firstName),null,2)}</pre>)
//     // return <pre>{JSON.stringify(usersData.users.map(u => u.firstName), null, 2)}</pre>
//     return (
//     <h1>hi</h1>
//   );
// }


// import { getAllModels } from "@/app/lib/models"

// export default async function ModelsPage() {
//   const models = await getAllModels()
//   return models.map(model => <p >{model.name}</p>)
// }


// app/about/mission/page.jsx
import modelsData from "../../data/model.json";

export default function Mission() {
  return (
    <div>
      <ul>
        {modelsData.map((item) => (
          <li key={item.id} style={{ marginBottom: "20px" }}>
            <h2>{item.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}