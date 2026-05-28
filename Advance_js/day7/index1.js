let progress = document.querySelector(".progress");
let text = document.querySelector("p");
let heading = document.querySelector("h2");
let btn = document.querySelector("#btn");

btn.addEventListener("click", function(){

    let count = 0;

    let download = setInterval(function(){

        count++;

        progress.style.width = count + "%";

        text.innerText = count + "%";

        if(count == 100){

            clearInterval(download);

            heading.innerText = "Download Complete";

            btn.innerText = "Completed";
        }

    }, 100);

});