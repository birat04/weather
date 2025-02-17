const apiKey = "6fda314fe036bf0a17882ae4ccf480a5";

async function getWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResult = document.getElementById("weatherResult");
        weatherResult.innerHTML = "<p>Fetching weather...</p>";
        weatherResult.classList.remove("hidden");

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherResult.innerHTML = "<p>City not found. Please try again.</p>";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherResult").innerHTML = "<p>Failed to fetch weather. Try again later.</p>";
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;

    weatherResult.innerHTML = `
        <h2>${cityName}</h2>
        <div class="weather-info">
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Weather:</strong> ${weatherDescription}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
        </div>
    `;
}

document.getElementById("weatherForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const city = document.getElementById("cityInput").value.trim();
    getWeather(city);
});
