const para = document.querySelector("p");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const originalText = para.innerText;

let interval = null; 
para.addEventListener("mouseenter", () => {

    let i = 0;

    clearInterval(interval);  
    interval = setInterval(() => {

        para.innerText = originalText
            .split("")
            .map((char, index) => {
                if (index < i) {
                    return originalText[index];   // original letter show
                }

                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");

        i++;

        if (i >= originalText.length) {
            clearInterval(interval);  
        }

    }, 30);

});

para.addEventListener("mouseleave", () => {
    clearInterval(interval);
    para.innerText = originalText;  // text normal wapas
});
