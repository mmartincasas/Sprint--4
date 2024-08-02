'use strict'

const jokesDiv = document.getElementById('jokesDiv')!;

// Función para obtener un chiste aleatorio
async function getRandomJoke() {
    try {
        // Realiza la solicitud a la API
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Analiza la respuesta como JSON
        const data = await response.json();

        // Muestra el chiste en la consola
        console.log(data.joke);
        
        jokesDiv.innerHTML = data.joke;

    } catch (error) {
        console.error('Error al obtener el chiste:', error);
    }
}

// Llama a la función para obtener un chiste aleatorio
getRandomJoke();