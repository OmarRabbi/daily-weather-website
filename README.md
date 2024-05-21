# Daily Weather Web Application

## Overview
This web application fetches and displays weather data from the WeatherAPI. It provides current weather conditions, hourly forecasts, and a 7-day weather forecast for a user-specified location or the user's current location. The application is built using HTML, CSS, and JavaScript, ensuring a responsive and user-friendly interface.

## Features
- **Current Weather:** Displays the current temperature, condition, and weather-related data.
- **Hourly Forecast:** Provides hourly weather data for the current day.
- **7-Day Forecast:** Displays a 7-day weather forecast.
- **Search Functionality:** Allows users to search for weather information by city name.
- **Current Location Weather:** Fetches weather data for the user's current location.
- **Error Handling:** Displays meaningful error messages for failed API requests or geolocation errors.
- **Responsive Design:** Ensures the application is usable across various devices and screen sizes.

## Requirements
- HTML
- CSS
- JavaScript
- WeatherAPI key - 926d234865c142ed9de65416241905 (available at [WeatherAPI](https://www.weatherapi.com/))

## Installation
1. Clone the repository:
   git clone https://github.com/OmarRabbi/daily-weather-app.git
   cd daily-weather-app
2. Open from `index.html`

## Usage
1. Search for a City:
    * Enter the city name in the search input field.
    * Click the "Search" button to fetch and display weather data  for the specified city.
2. Get Weather for Current Location:
    * Click the "Get Weather for Current Location" button.
    * Allow the browser to access your location to fetch and display the weather data.

## Code Structure
index.html: The main HTML file containing the structure of the web application.
style.css: The CSS file for styling the web application.
script.js: The JavaScript file containing the logic for fetching and displaying weather data.

## Error Handling
The application includes error handling for:
    * Failed API requests (invalid city names or network issues).
    * Geolocation errors (when the user denies location access).

## Live Demo
Demo link - https://omarrabbi.github.io/daily-weather-website/
