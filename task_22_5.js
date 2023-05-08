const wsUrl = "wss://echo-ws-service.herokuapp.com/"; // адрес эхо-сервера

function pageLoaded() {

    const infoOutput = document.querySelector(".info_output");
    const chatOutput = document.querySelector(".chat_output");
    const input = document.querySelector("input");
    const sentBtn = document.querySelector(".btn_send");
    const geoBtn = document.querySelector(".btn_geo");
    
    let displayResponse = true; // по умолчанию true - ответ сервера выводится в чат

    let socket = new WebSocket(wsUrl);

    // Обработчики событий WebSocket
    socket.onopen = () => {
        infoOutput.innerText = "Соединение установлено";
    }   

    socket.onmessage = (event) => {
        // Если у displayResponse значение true, то ответ сервера выводится в чат
        if (displayResponse) {
            writeToChat(event.data, true);
        };
        displayResponse = true;  // устанавливаем displayResponse значение по умолчанию (true)
    }

    socket.onerror = () => {
        infoOutput.innerText = "При передаче данных произошла ошибка";
    }

    // Обработчик на кнопку отправки сообщения
    sentBtn.addEventListener("click", () => {
        sendMessage(input.value);
    });

    // Функция отправки сообщения
    // отправляет только непустое сообщение и очищает поле ввода
    function sendMessage(message) {
        if (!message) return;
        socket.send(message);
        writeToChat(message, false);        
        input.value = "";        
    }

    // Функция добавления сообщения в чат
    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class = ${isRecieved? "recieved" : "sent"}> ${message} </div>`
        chatOutput.innerHTML += messageHTML;        
    }

    // Обработчик на кнопку запроса геолокации
    geoBtn.addEventListener("click", getLocation);

    // Запрос к Geolocation API
    function getLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        } else {
            writeOutput("Ваш браузер не поддерживает функцию определения местоположения");
        }
    }
    
    // Обработчик успешного запроса геолокации
    function locationSuccess(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;  
        // writeOutput(`<a href="${link}" target="_blank">Ссылка на местоположение</a>`);
        displayResponse = false;  // не выводить в чат ответ сервера, когда отправляется геолокация
        sendMessage(link);        
    }
    
    // Обработчик ошибочного запроса геолокации
    function locationError() {
        writeOutput("При получении местоположения произошла ошибка");
    }
    
    // Функция вывода служебных сообщений в поле ниже чата
    function writeOutput(message) {
        infoOutput.innerHTML = `<p>${message}</p>`;
    }

}

document.addEventListener("DOMContentLoaded", pageLoaded);
