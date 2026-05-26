let ul = document.querySelector("ul");

let allLi = document.querySelectorAll("li");

ul.addEventListener("click", function(dets){

    if(dets.target.tagName === "LI"){

        allLi.forEach(function(li){
            li.classList.remove("active");
        });

        dets.target.classList.add("active");
    }

});