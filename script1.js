// Event Listener to get the location input
document.getElementById("location-input").addEventListener('input', async () => {
    // Get the user-entered location
    const location = document.getElementById("location-input").value;

    // Fetch the weather data
    const weatherData = await getWeatherData(location);

    // Display the weather data on the page
    displayWeatherData(weatherData);
});

const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }

    const apiKey = 'c6cda76bc282fb7d642bafbb8a4be70a';
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();

    return data;
}

function getBackgroundColor(temperature) {
    if (temperature < 0)
        return 'lightblue';
    else if (temperature < 10)
        return 'lightgreen';
    else if (temperature < 20)
        return 'lightyellow';
    else if (temperature < 30)
        return 'lightsalmon';
    else
        return 'lightcoral';
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");
    if (Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Please enter a location to see the weather.";
    } else {
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${Math.floor(data.main.temp - 273.15)}C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
}

// Example: Fetch weather data for a default location ("London") when the page loads
window.onload = async () => {
    const defaultLocation = "London";
    const weatherData = await getWeatherData(defaultLocation);
    displayWeatherData(weatherData);
}

