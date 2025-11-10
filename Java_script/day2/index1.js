// for(let i=1;i<=10;i++)
// {
//     console.log(`5*${i}=${5*i}`)
// }

// let count = 0;
// for (let i = 1; i <= 15; i++) {
//     if (i > 8) { count++; console.log(i); }
// }
// console.log(`Total count is ==${count}`);
let password="hari";
let pass = prompt("age batao");

if (pass === null) {
    console.error("you cancelled it");
}
else if (pass.trim() === "") {
    console.error("Please write something");
}
else if (pass < 0) console.error("Plese enter Right Passowerd")
else
 
 {
    if(pass==password){
        console.log("macthed password")
    }
    else console.log("not matched")
}

