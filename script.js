// Add event listeners to the buttons
document.getElementById('submit').addEventListener('click', getWeather);
document.getElementById('forecast-btn').addEventListener('click', getForecast);

// Function to get current weather
function getWeather() {
    const city = document.getElementById('city').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;

    // Check if city is empty
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "efef9960a79f8ff4c792fac05366c741";
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit === 'F' ? 'imperial' : 'metric'}&appid=${apiKey}`;

    // Show the loading spinner
    document.getElementById('loading').style.display = 'block';

    // Fetch data from the weather API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Check if the city was found
            if (data.cod !== 200) {
                alert("City not found. Please try again.");
                document.getElementById('loading').style.display = 'none';
                return;
            }

            // Hide the spinner and show the result section
            document.getElementById('loading').style.display = 'none';
            document.getElementById('weather-result').style.display = 'block';

            // Update the UI with the weather data
            document.getElementById('temperature').textContent = `${data.main.temp}°${unit}`;
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        })
        .catch(error => {
            alert("Error fetching the weather data. Please try again.");
            console.error('Error:', error);
        });
}

// Function to get the 3-5 day forecast
function getForecast() {
    const city = document.getElementById('city').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;

    // Check if city is empty
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "efef9960a79f8ff4c792fac05366c741";
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit === 'F' ? 'imperial' : 'metric'}&appid=${apiKey}`;

    // Fetch data from the forecast API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Check if the city was found
            if (data.cod !== "200") {
                alert("City not found for forecast. Please try again.");
                return;
            }

            // Build the forecast HTML
            let forecastHTML = "<h3>3-5 Day Forecast:</h3>";
            for (let i = 0; i < data.list.length; i += 8) {
                const forecast = data.list[i];
                forecastHTML += `
                    <div>
                        <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
                        <p>${forecast.main.temp}°${unit}</p>
                        <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather icon">
                    </div>
                `;
            }

            // Display the forecast
            document.getElementById('forecast-result').innerHTML = forecastHTML;
            document.getElementById('forecast-result').style.display = 'block';
        })
        .catch(error => {
            alert("Error fetching the forecast data. Please try again.");
            console.error('Error:', error);
        });
}
