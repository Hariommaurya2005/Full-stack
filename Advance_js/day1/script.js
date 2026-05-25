
// function getWeather(){
//     let apiKey="d0bdc965bac42c109dab3ee7f70cf2d9";
//    let city=document.getElementById("city").value;
//    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
//    .then(response=>response.json()) 
//     .then(data=>{  console.log(data);

//     })

// }


async function getWeather(city) {
    try {
        let apiKey = "d0bdc965bac42c109dab3ee7f70cf2d9";
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        let data = await response.json();
        console.log(data);
    } catch (err) {
        console.log("Error:", err.message);
    }
}

getWeather("Noida");
