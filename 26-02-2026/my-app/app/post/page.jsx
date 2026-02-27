import Link from "next/link"

export default async function posts(){
    const res = await fetch("https://dummyjson.com/users")
    const data = await res.json()

    return(<div>
        <h1>Users</h1>
        <ul>
            {data.users.map(u=> (
                <li key={u.id}>
                    <Link href={`/post/${u.id}`}><h2>{u.firstName}</h2></Link>
                
            </li>))}
        </ul>
    </div>)
}