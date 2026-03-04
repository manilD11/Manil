type Address={
    no:number
    country:string

}
type Person ={
    name:string,
    age: number,
    isStudent:boolean
    address?: Address
}

const person1: Person ={
    name:"Manil",
    age:25,
    isStudent:false,
    address:{
        no:12,
        country:"India"
    }
}

const person2: Person= {
    name:"Virat",
    age:36,
    isStudent:true

}

function displayInfo(person: Person){
    return (`${person.name} is from ${person.address?.country}`)
}


console.log(displayInfo(person1))


