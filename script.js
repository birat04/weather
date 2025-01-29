// API Key from OpenWeatherMap (Sign up at https://openweathermap.org/api to get your own key)
const apiKey = "6fda314fe036bf0a17882ae4ccf480a5"; // Replace with your API key

// Function to fetch weather data
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherResult.innerHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${weatherDescription}</p>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
    `;
}

// Event listener for form submission
document.getElementById("weatherForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
    const city = document.getElementById("cityInput").value;
    getWeather(city);
});