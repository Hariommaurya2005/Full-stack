let age = prompt("age batao");

if (age === null) {
    console.error("you cancelled it");
}
else if (age.trim() === "") {
    console.error("Please write something");
}
else {
    age = Number(age);
    if (isNaN(age)) {
        console.error("Please enter a number");
    }
    else {
        console.log(`Ok age is = ${age}`);
    }
}
