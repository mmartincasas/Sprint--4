'use strict'

interface JokeReport {
    joke: string;
    score: number;
    date: string; // ISO 8601 string
}

const jokesDiv = document.getElementById('jokesDiv')!;
const weatherDescription = document.getElementById('weatherDescription')!;
const weatherIcon = document.getElementById('weatherIcon')!;
const weatherTemp = document.getElementById('weatherTemp')!;
const weatherHumidity = document.getElementById('weatherHumidity')!;
const reportJokes: JokeReport[] = [];

let currentJoke: string = '';
let selectedScore: number | null = null;


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

function initializeRating() {
    const buttons = document.querySelectorAll('#ratingButtons button');
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;

    buttons.forEach(button => {

        button.addEventListener('click', () => {
            
            buttons.forEach(btn => btn.classList.remove('btn-selected'));
            button.classList.add('btn-selected');
            selectedScore = parseInt(button.getAttribute('data-score')!);
            
        });
    });

    submitButton.addEventListener('click', () => {
        if (selectedScore !== null) {
            addJokeReport(selectedScore);
        } else {
            console.log('No score selected');
        }
        getRandomJoke();
    });
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
        currentJoke = data.joke;
        jokesDiv.innerHTML = currentJoke;

        selectedScore = null;
        const buttons = document.querySelectorAll('#ratingButtons button');
        buttons.forEach(btn => btn.classList.remove('btn-selected'));

    } catch (error) {
        console.error('Error getting joke', error);
    }
}


function addJokeReport(score: number) {

    const jokeReport: JokeReport = {
        joke: currentJoke,
        score,
        date: new Date().toISOString()
    };

    reportJokes.push(jokeReport);
    console.log('Joke Report added:', reportJokes);
}


getWeather();
getRandomJoke();
initializeRating();



