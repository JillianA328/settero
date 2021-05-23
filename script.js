//setting city
var city = $("#searchCity").val();
var temp = $("#tempEl");
var wind = $("#windEl");
var humidity = $("#humidEl");
var uvIn = $("#uvEl");
var apiKey = "27e890ac1ac349b8058e8451ef106db3";
var queryUrl = "";
 
$("#searchBtn").on("click", function () {
 //get the value from the input
 city = $("#searchCity").val();
 
 queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
 
 //clear value from the input
 $("#searchCity").val("");
 
 console.log(city);
 //additional function area
 addList();
 
 getCurrentWeather();
});
 
//function to add list items search a city card
function addList() {
 if (city) {
   var listItem = $("<li>").addClass("list-group-item").text(city);
   $(".list").append(listItem);
 }
}
 
//function to display current weather
function getCurrentWeather() {
 fetch(queryUrl)
   //arrow is another way to write function
   .then((response) => response.json())
   .then((data) => {
     console.log(data);
     //create variables for latitude and longitude of city for UV Index
     lat = data.coord.lat;
     lon = data.coord.lon;
     console.log(lon, lat);
 
     getForecast(lat, lon);
   });
 
 function getForecast(lat, lon) {
   fetch(
     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
   )
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
       console.log(data.current.dt);
 
       //convert date from api
       var currentDate = data.current.dt;
       $("#current-city").text().split(" ")[(0, 1, 2, 3, 4)];
       var date = new Date(currentDate * 1000);
       console.log(date);
       const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
 
       var weatherIcon = data.current.weather[0].icon;
       var iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
 
       //produce items
       $("h3").text("");
       $("#header-icon").attr("src", iconUrl);
       $("h3").append(`${city} (${month}/${day}/${year})`);
       temp.text(`Temp: ${Math.floor(data.current.temp)}°F`);
       wind.text(`Wind Speed: ${Math.floor(data.current.wind_speed)} MPH`);
       humidity.text(`Humidity: ${Math.floor(data.current.humidity)}%`);
       uvIn.text(`UV Index: ${data.current.uvi}`);
     });
 }
}