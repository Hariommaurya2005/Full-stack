let btn = document.querySelector("#btn");
let h1 = document.querySelector("#h1");
let main = document.querySelector("#main");


let data = [
    { team: "India", primary: "blue", secondary: "white" },
    { team: "Australia", primary: "yellow", secondary: "green" },
    { team: "England", primary: "navy", secondary: "red" }
];

btn.addEventListener('click', function () {
    
    
    let winner = data[Math.floor(Math.random() * data.length)];
   
    h1.innerHTML = winner.team;

    h1.style.backgroundColor = winner.secondary;
    main.style.backgroundColor = winner.primary;
});
