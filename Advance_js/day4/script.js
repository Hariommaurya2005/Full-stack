// let inp = document.querySelector("#input");
// inp.addEventListener("input",function(dets){
//     if(dets.data!==null){
//         console.log(dets.data);
//     }

// })

let sel = document.querySelector("#select");
let device = document.querySelector("#device");
sel.addEventListener("change",function(dets){
    device.textContent = `You selected: ${dets.target.value}`;
});