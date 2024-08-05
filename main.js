'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jokesDiv = document.getElementById('jokesDiv');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');
const weatherTemp = document.getElementById('weatherTemp');
const weatherHumidity = document.getElementById('weatherHumidity');
const jokeContainer = document.querySelector('.custom-background');
const reportJokes = [];
let currentJoke = '';
let selectedScore = null;
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=96cf2de381520089b251bc30cc3baf52`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            weatherDescription.innerHTML = `${data.weather[0].description.toUpperCase()}`;
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`;
            weatherTemp.innerHTML = `${data.main.temp} °C`;
            weatherHumidity.innerHTML = `${data.main.humidity} %`;
        }
        catch (error) {
            console.error('Error getting Weather', error);
        }
    });
}
function initializeRating() {
    const buttons = document.querySelectorAll('#ratingButtons button');
    const submitButton = document.getElementById('submitButton');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('btn-selected'));
            button.classList.add('btn-selected');
            let newSelectedScore = parseInt(button.getAttribute('data-score'));
            // Esto es para poder deseleccionar
            if (newSelectedScore === selectedScore) {
                selectedScore = null;
                button.classList.remove('btn-selected'); // Remover la clase si se deselecciona
            }
            else {
                selectedScore = newSelectedScore;
                button.classList.add('btn-selected'); // Agregar la clase al botón seleccionado
            }
        });
    });
    submitButton.addEventListener('click', () => {
        if (selectedScore !== null) {
            addJokeReport(selectedScore);
        }
        else {
            console.log('No score selected');
        }
        getRandomJoke();
    });
}
function fetchJokeAPI1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error getting joke from icanhazdadjoke.com', error);
        }
    });
}
function fetchJokeAPI2() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.chucknorris.io/jokes/random', {});
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error getting joke from chucknorris.io', error);
        }
    });
}
function changeJokeShape() {
    const shapes = ['shape-1', 'shape-2', 'shape-3', 'shape-4'];
    const currentShape = shapes.find(shape => jokeContainer.classList.contains(shape));
    let newShape;
    do {
        newShape = shapes[Math.floor(Math.random() * shapes.length)];
    } while (newShape === currentShape);
    shapes.forEach(shape => jokeContainer.classList.remove(shape));
    jokeContainer.classList.add(newShape);
}
function getRandomJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let chooseAPIJokes = Math.round(Math.random());
            let data;
            if (chooseAPIJokes === 1) {
                data = yield fetchJokeAPI1();
                currentJoke = data.joke;
            }
            else {
                data = yield fetchJokeAPI2();
                currentJoke = data.value;
            }
            jokesDiv.innerHTML = currentJoke;
            selectedScore = null;
            const buttons = document.querySelectorAll('#ratingButtons button');
            buttons.forEach(btn => btn.classList.remove('btn-selected'));
            changeJokeShape();
        }
        catch (error) {
            console.error('Error getting joke', error);
        }
    });
}
function addJokeReport(score) {
    const jokeReport = {
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
