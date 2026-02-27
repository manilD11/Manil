export default async function pos({params}){
    const {id} = await params
    
     const res = await fetch(`https://dummyjson.com/users/${id}`)
    const data = await res.json()
    return <h1>{data.firstName}</h1>
}

