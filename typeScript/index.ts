type Food ={
    id:number
    name:string
    price:number
} 

type  Order ={
    id:number
    item: Food
    status:"ordered"|"Completed"
}
const menu1:Food[] = [
    { id:1,name: "Idli", price: 20 },
    {id:2, name: "Dosa", price: 30 },
    { id:3,name: "poori", price: 20 },
    { id:4,name: "tea", price: 10 },
]



let cashInRegister1 = 100
let newID1 = 0
const orderQ1: Order[] = []


function addItem1(item: Omit<Food,"id">): void{
    const addItem ={
        id :newID1++,
        ...item
    }
    menu1.push(addItem)
}

function orderItem1(order: string):Order|undefined{
    const food = menu1.find(p=>p.name === order)
    if(!food){
        console.error("error")
        return
    }
    cashInRegister1 += food.price

    const newOrder: Order ={id:newID1++, item: food, status: "ordered"}
    orderQ1.push(newOrder)

    return newOrder
    
}

function orderComplete1(id: number):Order|undefined{
    const order = orderQ1.find(a => a.id === id)
     if(!order){
        console.error("error")
        return
    }
    order.status = "Completed"
     return order
} 

function getDetails(id : string | number):Food|undefined{
     
    if (typeof id === "number"){
         return menu1.find(a =>a.id === id) 
        
    }
    else{
    return menu1.find(a=>a.name === id.toLowerCase())
    }
}


// addItem1 ({id:5,name:"coffee" , price:15})

// orderItem1("tea")
// orderComplete1(1)


// console.log(menu1)
// console.log(orderQ1)
// console.log(cashInRegister1)


console.log(getDetails(1))