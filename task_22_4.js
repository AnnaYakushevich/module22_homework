function pageLoaded() {

    const btn = document.querySelector('.j-btn-test');
    const userCoord = document.querySelector('#coordinates');
    const userTimeDate = document.querySelector('#timeDate');
    
    // Функция, срабатывающая при ошибке получения данных о местоположении
    const getData_error = () => {
        userCoord.textContent = 'Информация о местоположении недоступна';
    }
    
    // Асинхронная функция, срабатывающая при успешном получении данных о местоположении,
    // запрашивает координаты из Geolocation API, по полученным координатам делает запрос к Timezone API,
    // выводит результат на страницу в div "userTimeDate" 
    const getData_success = async (position) => {
        // console.log('Результат запроса к Geolocation API', position);
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
       
        userCoord.textContent = ``;      
          
        const requestResult = await useRequest(latitude, longitude); 
        userTimeDate.innerHTML = `
            <p>Временная зона, в которой находится пользователь: ${requestResult.timezone}</p>
            <p>Местные дата и время: ${requestResult.date_time_txt}</p>
        `;
        // console.log('Результат запроса к Timezone API: ', requestResult);       
    }
    
    // Функция запроса к Timezone API
    const useRequest = (latitude, longitude) => { 
        return fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {   
            return json;
        })
        .catch(() => { console.log('error') });
    }    

    // Функция запроса данных о местоположении
    const getData = () => {
        if (!navigator.geolocation) {
            userCoord.textContent = 'Geolocation не поддерживается вашим браузером';
          } else {
            userCoord.textContent = 'Определение местоположения…';
            navigator.geolocation.getCurrentPosition(getData_success, getData_error);   
          } 
    }
    
    // Обработчик на кнопку
    btn.addEventListener("click", getData);
    
}

document.addEventListener("DOMContentLoaded", pageLoaded);