🌤 Weather Forecast Application
📖 Introduction

The Weather Forecast Application is a responsive web application developed using HTML, Tailwind CSS, and Vanilla JavaScript. The application fetches real-time weather data from the OpenWeatherMap API and displays both current weather conditions and a 5-day forecast in a user-friendly interface.

This project demonstrates practical knowledge of API integration, DOM manipulation, asynchronous JavaScript, and responsive UI design.

🎯 Project Objectives

Integrate a weather API to retrieve real-time data

Display current weather information dynamically

Provide a 5-day extended weather forecast

Implement location-based weather detection

Ensure proper validation and error handling

Create a responsive and intuitive user interface

🚀 Features Implemented
🔎 City-Based Weather Search

Users can search weather details by entering a city name.
The application displays:

Temperature (°C)

Humidity

Atmospheric Pressure

Weather condition description

Weather icon

📍 Current Location Weather

The application uses the Geolocation API to fetch weather details based on the user's current location.

If location permission is denied or unsupported, an appropriate message is displayed.

📅 5-Day Forecast

The application retrieves extended forecast data and displays:

Date

Temperature

Humidity

Weather description

Weather icon

The forecast section remains hidden until valid weather data is fetched.

🕘 Recently Searched Cities and Global Cities

Searched cities are stored using the browser's Local Storage.

A dropdown appears after the first successful search.

Selecting a city from the dropdown automatically reloads the weather data.

⚠ Error Handling & Validation

The application includes :

Validation for empty search input 

API error handling for invalid city names

Proper UI updates during errors

Forecast section hidden when errors occur

No usage of alert() — errors are displayed within the interface

🛠 Technologies Used

HTML5

Tailwind CSS

JavaScript (ES6)

OpenWeatherMap API

Local Storage API

Geolocation API

🔑 API Integration

The application uses the OpenWeatherMap API to retrieve:

Current weather data

5-day forecast data

API Endpoints Used
https://api.openweathermap.org/data/2.5/weather
https://api.openweathermap.org/data/2.5/forecast


To use this project, replace the API key inside script.js:

let API_KEY = "YOUR_API_KEY_HERE";

📱 Responsive Design

The application layout is built using Tailwind CSS and is fully responsive across:

Desktop screens

Tablets

Mobile devices

Responsive grid utilities such as:

grid-cols-1 md:grid-cols-2


ensure proper layout adjustment.

▶ How to Run the Project

Download or clone the repository.

Make sure Tailwind CSS is properly built.

Open index.html in your browser.

Enter a city name or use the current location feature.

📂 Project Structure
weather-forecast-app/
│
├── index.html
├── script.js
├── dist/
│   └── output.css
├── package.json
└── README.md

🧠 Learning Outcomes

Through this project, the following concepts were applied:

Fetch API and asynchronous programming

JSON data handling

DOM manipulation

Event listeners

Local Storage implementation

Responsive UI design

Error handling in web applications

👨‍💻 Conclusion

This project successfully demonstrates the implementation of a weather forecasting system using modern web development practices. The application provides a clean interface, reliable API integration, and responsive design to ensure a smooth user experience.