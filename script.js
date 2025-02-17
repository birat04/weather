document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const city = document.getElementById('cityInput').value;
    const apiKey = "6fda314fe036bf0a17882ae4ccf480a5";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            const weatherCity = document.getElementById('weatherCity');
            const weatherIcon = document.getElementById('weatherIcon');
            const weatherDescription = document.getElementById('weatherDescription');
            const weatherTemperature = document.getElementById('weatherTemperature');
            const weatherHumidity = document.getElementById('weatherHumidity');
            const weatherWind = document.getElementById('weatherWind');

            weatherCity.textContent = data.name;
            weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
            weatherDescription.textContent = data.weather[0].description;
            weatherTemperature.textContent = data.main.temp;
            weatherHumidity.textContent = data.main.humidity;
            weatherWind.textContent = data.wind.speed;

            weatherResult.classList.remove('hidden');
        })
        .catch(error => {
            alert(error.message); 
        });
});