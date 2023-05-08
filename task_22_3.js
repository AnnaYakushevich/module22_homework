const btn = document.querySelector('.j-btn-test');
const screen = document.querySelector('#screen');
const userCoord = document.querySelector('#coordinates');

// Функция запроса и вывода данных о размере экрана
const screenSize = () => {  
    const screenWidth = window.screen.width;
    const screenHeigth = window.screen.height;
    screen.textContent = `Ширина экрана ${screenWidth}px, высота экрана ${screenHeigth}px`;
    // console.log('Размер экрана: ', `Ширина экрана ${screenWidth}px, высота экрана ${screenHeigth}px`);   
}  

// Функция запроса и вывода данных о местоположении
const coordinates = () => {
    if (!navigator.geolocation) {
        userCoord.textContent = 'Geolocation не поддерживается вашим браузером';;
      } else {
        userCoord.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
      }
}
// Функция, срабатывающая при ошибке получения данных о местоположении
const error = () => {
    userCoord.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении данных о местоположении
const success = (position) => {
    // console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    userCoord.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    // console.log('Координаты: ',`Широта: ${latitude} °, Долгота: ${longitude} °`);
}

// Обработчик на кнопку
btn.addEventListener('click', () => {
    coordinates();    
    screenSize();
});