const searchBtn = document.querySelector('#search-btn');
const queryInput = document.querySelector('#query');
const weatherDiv = document.getElementById('weather');
const forecastDiv = document.getElementById('forecast');

// https://openweathermap.org/img/wn/{icon_code}@2x.png
// https://api.openweathermap.org/data/2.5/weather?units=metric&appid={API key}&q={city name}

const apiBase = 'https://api.openweathermap.org/data/2.5';
const apiKey = '7fe21bb17bbe4e1a146655cde8a0a657';
const weatherPath = 'weather?units=metric&lang=hr';
const forecastPath = 'forecast?units=metric&lang=hr';

// https://api.openweathermap.org/data/2.5/forecast?units=metric&appid={API key}&q={city name}

const showWeather = (data, element) => {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const windSpeed = data.wind.speed;
    const desc = data.weather[0].description;    

    const img = document.createElement('img');
    const imgPath = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    img.setAttribute('src', imgPath);
    element.append(img);

    const tempParagraph = document.createElement('p');
    tempParagraph.innerHTML = 'Temp: ' + temp + ' &deg;C';
    element.append(tempParagraph);

    const humidityParagraph = document.createElement('p');
    humidityParagraph.innerText = 'Humidity: ' + humidity + '%';
    element.append(humidityParagraph);

    const pressureParagraph = document.createElement('p');
    pressureParagraph.innerText = 'Pressure: ' + pressure + ' hPa';
    element.append(pressureParagraph);

    const windSpeedParagraph = document.createElement('p');
    windSpeedParagraph.innerText = 'Wind: ' + windSpeed + ' m/s';
    element.append(windSpeedParagraph);

    const descParagraph = document.createElement('p');
    descParagraph.innerText = desc;
    element.append(descParagraph);
}

const getCityValue = () => {
    const city = queryInput.value;
    if(city.length < 3) {
        weatherDiv.innerText = 'bar 3 slova molim';
        return null;
    }

    return city;
}

const searchWeather = () => {  
    const city = getCityValue();
    if(!city) {
        return;
    }

    const xhr = new XMLHttpRequest();

    // dohvati podatke s apija
    xhr.open('GET', `${apiBase}/${weatherPath}&appid=${apiKey}&q=${city}`, true);

    xhr.onload = (e) => {
        if(e.target.status === 404) {
            const error = JSON.parse(e.target.response)
            weatherDiv.innerText = error.message;
            return;
        }

        const json = e.target.response;
        const weatherData = JSON.parse(json);

        weatherDiv.innerHTML = '';
        showWeather(weatherData, weatherDiv);
    }

    xhr.send();
}

const showForecast = (forecastData) => {
    forecastDiv.innerHTML = '';

    let currentDate = new Date().getDate();
    for(let i = 0; i < forecastData.list.length; i++){
        const div = document.createElement('div');
        div.classList.add('inline');

        const dateTime = new Date(forecastData.list[i].dt*1000);
        const h4 = document.createElement('h4');
        h4.innerText = dateTime.toLocaleString();
        div.append(h4);

        showWeather(forecastData.list[i], div);

        if(dateTime.getDate() > currentDate) {
            currentDate = dateTime.getDate();
            const br = document.createElement('br');
            forecastDiv.append(br);
        }
        forecastDiv.append(div);
    }
}

const searchForecast = () => {
    const city = getCityValue();
    if(!city) {
        return;
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${apiBase}/${forecastPath}&appid=${apiKey}&q=${city}`, true);

    xhr.onload = (e) => {
        if(e.target.status === 404) {
            const error = JSON.parse(e.target.response)
            forecastDiv.innerText = error.message;
            return;
        }

        const json = e.target.response;
        const forecastData = JSON.parse(json);

        showForecast(forecastData);
    }

    xhr.send();
}

searchBtn.addEventListener('click', searchWeather);
searchBtn.addEventListener('click', searchForecast);
