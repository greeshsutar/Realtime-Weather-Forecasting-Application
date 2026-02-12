const btn = document.getElementById("searchbtn");
const search = document.querySelector(".inputsearch");
const place = document.querySelector(".place");
const humidity = document.querySelector(".humidity");
const temps = document.querySelector(".temp");
const pressure = document.querySelector(".pressure");
const importantdata = document.querySelector(".importantdata");
const conditions = document.querySelector(".conditionclass");
const inner21 = document.querySelector(".inner21");
const locationbtn = document.querySelector("#locationbtn");
const recentCities = document.getElementById("recentCities");

let API_KEY = "YOUR_API_KEY";


// ================= SEARCH BUTTON =================
btn.addEventListener("click", async function(){

  let city = search.value.trim();

  if(city === ""){
    conditions.innerHTML = "Please enter a city name.";
    inner21.classList.add("hidden");
    return;
  }

  try{

    // -------- CURRENT WEATHER --------
    let fetchvalue = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if(!fetchvalue.ok){
      throw new Error("City not found");
    }

    let data = await fetchvalue.json();

    let condition = "";
    let temp = data.main.temp;

    if (temp <= 0) {
      condition = "❄ Freezing – Extreme cold conditions. Stay warm!";
    }
    else if (temp <= 10) {
      condition = "🥶 Very Cold – Heavy winter weather.";
    }
    else if (temp <= 20) {
      condition = "🌬 Cool – Light jacket recommended.";
    }
    else if (temp <= 25) {
      condition = "🙂 Pleasant – Perfect weather to enjoy outside.";
    }
    else if (temp <= 30) {
      condition = "🌤 Warm – Slightly hot but comfortable.";
    }
    else if (temp <= 35) {
      condition = "🔥 Hot – Stay hydrated and avoid direct sun.";
    }
    else {
      condition = "🥵 Very Hot – Extreme heat, take precautions!";
    }

    place.innerHTML = data.name.toUpperCase();
    temps.innerHTML = `🌡 Temp: ${data.main.temp} °C`;
    humidity.innerHTML = `💧 Humidity: ${data.main.humidity}%`;
    pressure.innerHTML = `🧭 Pressure: ${data.main.pressure} hPa`;
    conditions.innerHTML = condition;

    // -------- SAVE CITY TO LOCAL STORAGE --------
    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
    }

    loadCities();

    // -------- FORECAST --------
    let newfetch = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!newfetch.ok) {
      throw new Error("Forecast error");
    }

    let responses = await newfetch.json();

    inner21.classList.remove("hidden");
    inner21.innerHTML = "";

    let dailyData = responses.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    dailyData.slice(0,5).forEach(day => {

      let card = document.createElement("div");
      card.className = "border-2 border-white rounded-xl p-2";

      card.innerHTML = `
        <h3>${new Date(day.dt_txt).toDateString()}</h3>
        <p>🌡 ${day.main.temp} °C</p>
        <p>💧 ${day.main.humidity}%</p>
        <p>🌤 ${day.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
      `;

      inner21.appendChild(card);
    });

  }
  catch(error){
    conditions.innerHTML = "Error: City not found.";
    inner21.classList.add("hidden");
    inner21.innerHTML = "";
  }

  search.value = "";
});


// ================= LOCAL STORAGE DROPDOWN =================
function loadCities(){

  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  if(cities.length === 0){
    recentCities.classList.add("hidden");
    return;
  }

  recentCities.classList.remove("hidden");
  recentCities.innerHTML = "<option>Select Recent City</option>";

  cities.forEach(function(c){
    let option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    recentCities.appendChild(option);
  });
}

recentCities.addEventListener("change", function(){
  search.value = this.value;
  btn.click();
});


// ================= CURRENT LOCATION =================
locationbtn.addEventListener("click", function(){

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, function(){
      conditions.innerHTML = "Location access denied.";
    });
  }
  else{
    conditions.innerHTML = "Geolocation not supported.";
  }
});

function success(position){

  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  getWeatherByCoords(lat, lon);
}

async function getWeatherByCoords(lat, lon){

  try{

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Location weather error");
    }

    let data = await response.json();

    place.innerHTML = data.name;
    temps.innerHTML = `🌡 Temp: ${data.main.temp} °C`;
    humidity.innerHTML = `💧 Humidity: ${data.main.humidity}%`;
    pressure.innerHTML = `🧭 Pressure: ${data.main.pressure} hPa`;
    conditions.innerHTML = data.weather[0].description;

    let forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    let forecastData = await forecastRes.json();

    inner21.classList.remove("hidden");
    inner21.innerHTML = "";

    let dailyData = forecastData.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    dailyData.slice(0,5).forEach(day => {

      let card = document.createElement("div");
      card.className = "border-2 border-white rounded-xl p-2";

      card.innerHTML = `
        <h3>${new Date(day.dt_txt).toDateString()}</h3>
        <p>🌡 ${day.main.temp} °C</p>
        <p>💧 ${day.main.humidity}%</p>
        <p>🌤 ${day.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
      `;

      inner21.appendChild(card);
    });

  }
  catch(err){
    conditions.innerHTML = "Unable to fetch location weather.";
    inner21.classList.add("hidden");
  }
}


// Load cities on page load
loadCities();
