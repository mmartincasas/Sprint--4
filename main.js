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
// Función para obtener un chiste aleatorio
function getRandomJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Realiza la solicitud a la API
            const response = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json',
                }
            });
            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            // Analiza la respuesta como JSON
            const data = yield response.json();
            // Muestra el chiste en la consola
            console.log(data.joke);
            jokesDiv.innerHTML = data.joke;
        }
        catch (error) {
            console.error('Error al obtener el chiste:', error);
        }
    });
}
// Llama a la función para obtener un chiste aleatorio
getRandomJoke();
