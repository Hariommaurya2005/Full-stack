let age = prompt("age batao");

if (age === null) {
    console.error("you cancelled it");
}
else if (age.trim() === "") {
    console.error("Please write something");
}
else if (age < 0) console.error("Plese enter Right Age")
else
    age = Number(age);
if (isNaN(age)) {
    console.error("Please enter a number");
}
else {
    if(age>18){
        console.log("you are eleglible for vote")
    }
    else console.log("you are not eleglible")
}

