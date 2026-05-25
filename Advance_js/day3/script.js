// function getScorse(...scores) {

//     let total = 0;
//     for (let score of scores) {
//         total += score;
//     }
//     return total;

// }
// console.log(getScorse(10, 20, 30)); 

// function abcd(val){
//     val();
// }
// abcd(function(){
//     console.log("Hello world");
// })


// function outer(){
//     let count = 0;
//     return function inner(){
//         count++;
//         console.log(count);
//     }
// }
// let counter = outer();
// counter();
// counter();
// counter();

// function discountCalculator(discount) {
//     return function (price) {
//         return price - (price * discount / 100);
//     }}
//     let diascounter=discountCalculator(20);
//     console.log(diascounter(1000));
//     console.log(diascounter(500));

function counter(){
    let count = 0;
     return function (){
        count++;
        return count;
     }
}
let counter1 = counter();
console.log(counter1());
console.log(counter1());    
console.log(counter1());

let counter2 = counter();
console.log(counter2());
console.log(counter2());
console.log(counter1());
