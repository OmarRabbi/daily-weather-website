document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '926d234865c142ed9de65416241905';
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('locationBtn');

    searchBtn.addEventListener('click', function () {
        const city = cityInput.value;
        if (city) {
            fetchWeatherByCity(city);
        }
    });

    locationBtn.addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
            }, () => {
                alert("Unable to retrieve your location. Allow location setting in your browser.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    function fetchWeatherByCity(city) {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
            .then(response => response.json())
            .then(data => {
                updateWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Enter the correct location. Please try again.');
            });
    }

    function fetchWeatherByCoords(lat, lon) {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`)
            .then(response => response.json())
            .then(data => {
                updateWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Unable to retrieve weather data for your location. Please try again.');
            });
    }

    function updateWeatherData(data) {
        document.getElementById('currentTemp').innerText = `${data.current.temp_c}°C`;
        document.getElementById('currentHumidity').innerText = `${data.current.humidity}%`;
        document.getElementById('currentCondition').innerText = data.current.condition.text;
        document.getElementById('currentWind').innerText = `${data.current.wind_kph} km/h`;

        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const localDate = new Date(data.location.localtime.replace(/-/g, '/')); // Replacing hyphens with slashes for Safari compatibility
        document.getElementById('currentDate').innerText = localDate.toLocaleDateString(undefined, dateOptions);
        
        document.getElementById('currentCity').innerText = data.location.name;
        document.getElementById('currentWeatherIcon').children[0].src = `https:${data.current.condition.icon}`;

        const hourlyWeather = document.getElementById('hourlyWeather');
        hourlyWeather.innerHTML = '';
        for (let i = 0; i < 24; i += 3) {
            const hourData = data.forecast.forecastday[0].hour[i];
            const hourCard = document.createElement('div');
            hourCard.classList.add('card');
            const time = new Date(hourData.time.replace(/-/g, '/')).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            hourCard.innerHTML = `
                <p>${time}</p>
                <img class="weather-icon" src="https:${hourData.condition.icon}" alt="">
                <p>${hourData.temp_c}°C</p>
            `;
            hourlyWeather.appendChild(hourCard);
        }

        const weeklyWeather = document.getElementById('weeklyWeather');
        weeklyWeather.innerHTML = '';
        data.forecast.forecastday.forEach(day => {
            const dayCard = document.createElement('div');
            dayCard.classList.add('card');
            dayCard.innerHTML = `
                <div class="day">${new Date(day.date.replace(/-/g, '/')).toLocaleDateString('en-US', { weekday: 'short' })}
                <img class="weather-icon" src="https:${day.day.condition.icon}" alt="">
                <div class="temp">Day - ${day.day.maxtemp_c}°C</div>
                <div class="temp">Night - ${day.day.mintemp_c}°C</div>
            `;
            weeklyWeather.appendChild(dayCard);
        });
    }
});
