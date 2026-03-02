const menu1 = [
    { name: "Idli", price: 20 },
    { name: "Dosa", price: 30 },
    { name: "poori", price: 20 },
    { name: "tea", price: 10 },
]

let cashInRegister1 = 100
let newID1 = 0
const oderQ1 = []


function addItem1(item){
    menu1.push(item)
}

function orderItem1(order: string){
    const food = menu1.find(p=>p.name === order)
    cashInRegister1 += food.price

    const newOrder ={id:newID1++,item: food, status: "ordered"}
    orderQ1.push(newOrder)

    return newOrder
    
}

function orderComplete1(id: number){
    const order = orderQ1.find(a => a.id === id)
    order.status = "Completed"
     return order
}

addItem1 ({name:"coffee" , price:15})

orderItem1("tea")
orderComplete1(1)


console.log(menu1)
console.log(orderQ1)
console.log(cashInRegister1)

