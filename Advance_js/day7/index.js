const form = document.getElementById("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let country = document.getElementById("country");
    let message = document.getElementById("message");

    // Regex
    let nameRegex = /^[A-Za-z ]{3,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^[A-Z].{5,}$/;

    // Name
    if(nameRegex.test(name.value)){
        name.style.border = "2px solid green";
        document.getElementById("nameError").innerText = "";
    }
    else{
        name.style.border = "2px solid red";
        document.getElementById("nameError").innerText = "Enter valid name";
    }

    // Email
    if(emailRegex.test(email.value)){
        email.style.border = "2px solid green";
        document.getElementById("emailError").innerText = "";
    }
    else{
        email.style.border = "2px solid red";
        document.getElementById("emailError").innerText = "Enter valid email";
    }

    // Password
    if(passwordRegex.test(password.value)){
        password.style.border = "2px solid green";
        document.getElementById("passwordError").innerText = "";
    }
    else{
        password.style.border = "2px solid red";
        document.getElementById("passwordError").innerText = "Start with capital letter";
    }

    // Country
    if(country.value != ""){
        country.style.border = "2px solid green";
        document.getElementById("countryError").innerText = "";
    }
    else{
        country.style.border = "2px solid red";
        document.getElementById("countryError").innerText = "Select country";
    }

    // Message
    if(message.value.trim() != ""){
        message.style.border = "2px solid green";
        document.getElementById("messageError").innerText = "";
    }
    else{
        message.style.border = "2px solid red";
        document.getElementById("messageError").innerText = "Message required";
    }

});