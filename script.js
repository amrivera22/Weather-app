document.getElementById('getWeather').addEventListener('click', async function() {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const location = `${city},${state}`; // Combine city and state
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const loadingSpinner = document.getElementById('loading');
    const resultContainer = document.getElementById('result');
    const forecastContainer = document.getElementById('forecast');
    const weatherData = document.getElementById('weatherData');

    loadingSpinner.style.display = 'block'; // Show loading spinner
    resultContainer.style.display = 'none'; // Hide result container
    forecastContainer.style.display = 'none'; // Hide forecast container

    try {
        // Fetch current weather data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=efef9960a79f8ff4c792fac05366c741`);
        const data = await response.json();

        // Display current weather data
        if (data.main) {
            weatherData.innerText = `Temperature: ${data.main.temp}°${unit === 'metric' ? 'C' : 'F'}\nWeather: ${data.weather[0].description}`;
            resultContainer.style.display = 'block';
        } else {
            weatherData.innerText = 'Location not found. Please try again.';
            resultContainer.style.display = 'block';
        }

        // Fetch 5-day forecast data
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&appid=efef9960a79f8ff4c792fac05366c741`);
        const forecastData = await forecastResponse.json();

        // Display 5-day forecast
        if (forecastData.list) {
            const forecastList = forecastData.list;
            forecastContainer.innerHTML = '<h2>5-Day Forecast</h2><ul>';
            for (let i = 0; i < forecastList.length; i += 8) { // Get one forecast entry per day
                const forecast = forecastList[i];
                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString();
                const temp = forecast.main.temp;
                const description = forecast.weather[0].description;

                forecastContainer.innerHTML += `<li>${day}: ${temp}°${unit === 'metric' ? 'C' : 'F'}, ${description}</li>`;
            }
            forecastContainer.innerHTML += '</ul>';
            forecastContainer.style.display = 'block'; // Show forecast container
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherData.innerText = 'Error fetching weather data. Please try again later.';
        resultContainer.style.display = 'block';
    } finally {
        loadingSpinner.style.display = 'none'; // Hide loading spinner
    }
});
