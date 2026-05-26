

const container = document.querySelector(".container");

const glow = document.createElement("div");

glow.classList.add("cursor-glow");

container.appendChild(glow);

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animate(){

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    glow.style.left = currentX + "px";
    glow.style.top = currentY + "px";

    requestAnimationFrame(animate);
}

animate();