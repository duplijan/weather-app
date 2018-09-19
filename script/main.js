const elements = {
  city: document.querySelector('.place'),
  weather: document.querySelector('.weather'),
  temperature: document.querySelector('.temperature'),
  wind: document.querySelector('.wind'),
  btn: document.querySelector('.btn'),
  search: document.querySelector('.search'),
  img: document.querySelector('img'),
  section: document.querySelector('.section'),
  emptyInputIcon: document.querySelector('.empty-input-icon')
}

function getWeather(){

  if(loader){
    clearLoader();
  }

  function getInput(){
    return elements.search.value;
  }
  let cityName = getInput();

  (function clearInput(){
     return elements.search.value = '';
    elements.search.focus();
  })();

  // let cityName = elements.search.value;
  // elements.search.value = '';
  // elements.search.focus();
  loader();
  clearSearch();
  
  async function getData(){
    const key = '9fb8a63329fd78cf5a27f8efa6ec81e7';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

    try {
      fetch(api)
      .then( response => response.json())
      .then( data => {
        let weather = data;

        clearLoader();
        updateDOM(weather);
      });
    } catch(err){
      alert(err);
    }
  }

  function updateDOM(weather){
      let city = weather.name;
      let temp = K2C(weather.main.temp) + '°C';
      let weat = weather.weather[0].main;
      let wind = weather.wind.speed + ' m/s ';

      // elements.city.innerHTML = city;
      // elements.temperature.innerHTML = temp;
      // elements.weather.innerHTML = weat;
      // elements.wind.innerHTML = wind;

      clearSearch();
      changeImage(weat);
      renderHTML(city, temp, weat, wind);
  }

  function clearSearch(){
    return elements.section.innerHTML = '';
  }

  function renderHTML(city, temp, weat, wind){
    const markup = `
          <div class="info">
            <h2 class='place'>${city}</h2>
            <span class='weather'>${weat}</span>
            <span class='temperature'>${temp}</span>
            <span class='wind'> ${wind}</span>
          </div>
    `;
    elements.section.insertAdjacentHTML('afterbegin',markup);
  }

  function changeImage(weat){
    let weather = weat.toLowerCase();
    elements.img.src =  `./img/${weather}.jpg`;
  }

  function loader(){
    const loader =  `
          <div class="loader">
            <img class='loader-icon' src="./img/loader.png" alt="">
          </div>
    `;
    elements.section.parentNode.insertAdjacentHTML('afterbegin',loader);
  }

  function clearLoader(){
    const loader = document.querySelector('.loader');
    console.log(loader);
    if(loader){
      loader.parentElement.removeChild(loader);
    }
  }

  function K2C(k){
    return Math.round(k - 273.15);
  }
  getData();
}

elements.btn.addEventListener('click', getWeather);
