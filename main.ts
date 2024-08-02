'use strict'

const jokesDiv = document.getElementById('jokesDiv')!;
const weatherDescription = document.getElementById('weatherDescription')!;
const weatherIcon = document.getElementById('weatherIcon')!;
const weatherTemp = document.getElementById('weatherTemp')!;
const weatherHumidity = document.getElementById('weatherHumidity')!;

async function getWeather() {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=96cf2de381520089b251bc30cc3baf52`)

        if (!response.ok){
            throw new Error (`Error: ${response.status}`)
        }

        const data = await response.json();
        console.log(data)

        weatherDescription.innerHTML = `${data.weather[0].description.toUpperCase()}`;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`;
        weatherTemp.innerHTML = `${data.main.temp} °C`;
        weatherHumidity.innerHTML = `${data.main.humidity} %`;

    }catch (error){
        console.error('Error getting Weather', error)
    }
}

async function getRandomJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        jokesDiv.innerHTML = data.joke;

    } catch (error) {
        console.error('Error getting joke', error);
    }
}

getRandomJoke();
getWeather();

