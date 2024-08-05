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
const jokeContainer = document.querySelector('.custom-background') as HTMLDivElement;
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
            let newSelectedScore = parseInt(button.getAttribute('data-score')!);

            // Esto es para poder deseleccionar
            if (newSelectedScore === selectedScore) {
                selectedScore = null;
                button.classList.remove('btn-selected'); // Remover la clase si se deselecciona
            } else {
                selectedScore = newSelectedScore;
                button.classList.add('btn-selected'); // Agregar la clase al botón seleccionado
            }
            
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


async function fetchJokeAPI1 (): Promise<any> {

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
        return data;

    } catch (error) {
        console.error('Error getting joke from icanhazdadjoke.com', error);
    }
}

async function fetchJokeAPI2 (): Promise<any> {

    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random', {
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error getting joke from chucknorris.io', error);
    }
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


async function getRandomJoke() {

    try {

        let chooseAPIJokes = Math.round(Math.random())

        let data: any

        if (chooseAPIJokes===1){
             data = await fetchJokeAPI1();
             currentJoke = data.joke;
        }else{
             data = await fetchJokeAPI2();
             currentJoke = data.value;
        }
        
        jokesDiv.innerHTML = currentJoke;

        selectedScore = null;
        const buttons = document.querySelectorAll('#ratingButtons button');
        buttons.forEach(btn => btn.classList.remove('btn-selected'));
        changeJokeShape();

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



