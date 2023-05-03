const searchBtn = document.querySelector('#search-btn');
const queryInput = document.querySelector('#query');
const weatherDiv = document.getElementById('weather');

const xhr = new XMLHttpRequest();

// https://api.openweathermap.org/data/2.5/weather?units=metric&appid={API key}&q={city name}

const apiBase = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = '05cc69d44171f8103f1deb50c225705d';

// https://openweathermap.org/img/wn/{icon_code}@2x.png

const showWeather = (weatherData) => {
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const windSpeed = weatherData.wind.speed;
    const desc = weatherData.weather[0].description;

    weatherDiv.innerHTML = '';

    const img = document.createElement('img');
    const imgPath = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    img.setAttribute('src', imgPath);
    weatherDiv.append(img);

    const tempParagraph = document.createElement('p');
    tempParagraph.innerHTML = 'Temp: ' + temp + ' &deg;C';
    weatherDiv.append(tempParagraph);

    const humidityParagraph = document.createElement('p');
    humidityParagraph.innerText = 'Humidity: ' + humidity + '%';
    weatherDiv.append(humidityParagraph);

    const pressureParagraph = document.createElement('p');
    pressureParagraph.innerText = 'Pressure: ' + pressure + ' hPa';
    weatherDiv.append(pressureParagraph);

    const windSpeedParagraph = document.createElement('p');
    windSpeedParagraph.innerText = 'Wind: ' + windSpeed + ' m/s';
    weatherDiv.append(windSpeedParagraph);

    const descParagraph = document.createElement('p');
    descParagraph.innerText = desc;
    weatherDiv.append(descParagraph);
}

const searchWeather = () => {
    const city = queryInput.value;
    if(city.length < 3) {
        weatherDiv.innerText = 'bar 3 slova molim';
        return;
    }

    // dohvati podatke s apija
    xhr.open('GET', `${apiBase}&appid=${apiKey}&q=${city}`, true);    

    xhr.onload = (e) => {
        if(e.target.status === 404) {
            const error = JSON.parse(e.target.response)
            weatherDiv.innerText = error.message;
            return;
        }

        const json = e.target.response;
        const weatherData = JSON.parse(json);

        showWeather(weatherData);
    }

    xhr.send();
}

searchBtn.addEventListener('click', searchWeather);
