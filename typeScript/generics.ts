const gameS = [14, 21, 33, 42, 59]
const pharse = ["raindrops on roses", "whiskers on kittens", "bright copper kettles", "warm woolen mittens"];
const user= [{ name: "Ali", age: 42 }, { name: "Bo", age: 77 }]

function getLastItem<M>(array: M[]):M|undefined {
    return array[array.length - 1]
}


console.log(getLastItem(gameS))
console.log(getLastItem(pharse))
console.log(getLastItem(user))