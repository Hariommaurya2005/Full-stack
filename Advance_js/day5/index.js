let btn=document.querySelector("#btn");
let input=document.querySelector("#file");
btn.addEventListener("click",function(){
   input.click();
});
input.addEventListener("change",function(dets){ 
   let file=dets.target.files[0];
   if(file){
    btn.textContent=file.name;
   }        
});