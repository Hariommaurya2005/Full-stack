// function abcd({name,age}){
//     console.log(name,age);

// }
// abcd({name:"Hariom",Age:"27"})

function abcd(a,b=3,c,d){
    console.log(a,b,c,d);

}
let arr=[1,2,3,4];
abcd(...arr);