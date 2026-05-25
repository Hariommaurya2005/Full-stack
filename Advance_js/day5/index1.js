let form = document.querySelector("#form");

let input = form.querySelectorAll("input");

let main = document.querySelector(".main");

form.addEventListener("submit", function (dets) {

    dets.preventDefault();

    let card = document.createElement("div");
    card.classList.add("card");

    let profile = document.createElement("div");
    profile.classList.add("profile");

    let img = document.createElement("img");

    img.src = input[3].value;

    let h3 = document.createElement("h3");
    h3.textContent = input[0].value;

    let h5 = document.createElement("h5");
    h5.textContent = input[1].value + " Years Old";

    let email = document.createElement("h6");
    email.textContent = input[2].value;

    let p = document.createElement("p");
    p.textContent = input[4].value;

    
    profile.appendChild(h3);
    profile.appendChild(img);
    profile.appendChild(h5);
    profile.appendChild(email);
    profile.appendChild(p);

    card.appendChild(profile);

    main.appendChild(card);
    input.forEach(function(inp){
        if(input.type !== "submit"){
            inp.value="";
        }
    });


});