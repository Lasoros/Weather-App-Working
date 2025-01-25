

const weatherApp = document.querySelector(".weatherApp");
const cityInput = document.querySelector(".cityInput");
const weatherWrapper = document.querySelector(".weather-wrapper");
const api = "a17959f667e7b1e8813205b90484f33a";

weatherApp.addEventListener("submit", async event => {

    event.preventDefault();

    const showCity = cityInput.value;

    if(showCity){
        try{
            const weatherData = await fetchWeather(showCity);
            showWeather(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("You forgot to enter a City!");
    }
});


async function fetchWeather(showCity){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${showCity}&appid=${api}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Error: Fetching Weather Data");
    }

    return await response.json();
}

function showWeather(data){

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    weatherWrapper.textContent = "";
    weatherWrapper.style.display = "flex";

    const showCity = document.createElement("h1");
    const showTemp = document.createElement("p");
    const showHumidity = document.createElement("p");
    const showDescription = document.createElement("p");
    const weatherImg = document.createElement("p");

    showCity.textContent = city;
    showTemp.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    showHumidity.textContent = `Humidity: ${humidity}%`;
    showDescription.textContent = description;
    weatherImg.textContent = fetchWeatherImg(id);

    showCity.classList.add("showCity");
    showTemp.classList.add("showTemp");
    showHumidity.classList.add("showHumidity");
    showDescription.classList.add("showDescription");
    weatherImg.classList.add("weatherImg");

    weatherWrapper.appendChild(showCity);
    weatherWrapper.appendChild(showTemp);
    weatherWrapper.appendChild(showHumidity);
    weatherWrapper.appendChild(showDescription);
    weatherWrapper.appendChild(weatherImg);
}
function fetchWeatherImg(weatherId){


    console.log(weatherId);

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

function displayError(message){

    const showError = document.createElement("p");
    showError.textContent = message;
    showError.classList.add("showError");

    weatherWrapper.textContent = "";
    weatherWrapper.style.display = "flex";
    weatherWrapper.appendChild(showError);
}