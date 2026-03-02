function isPali(text) {
    var reversed = text.split("").reverse().join("");
    return text === reversed;
}
console.log(isPali("madam"));
console.log(isPali("Sir"));
