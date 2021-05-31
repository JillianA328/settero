//setting city
var city = $("#searchCity").val();
var temp = $("#tempEl");
var wind = $("#windEl");
var humidity = $("#humidEl");
var uvIn = $("#uvEl");
var weatherURL = "94f83bcd13e457e18b174c45bbe04458";
var queryUrl = "";
var foreCastURL = "9357eff8b54eb1aa593011e2d69b6287";



$("#searchBtn").on("click", function () {
  //get the value from the input
  city = $("#searchCity").val();

  queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherURL}`;

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
      getFiveDayForecast(lat, lon);
        });
      }

  function getForecast(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherURL}`)
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

        uvIndex(data);
      });
  }


// change the uv index color
function uvIndex(data) {

  uvIn.addClass("badge");

  if (data.current.uvi < 3) {
    uvIn.removeClass("bg-warning text-dark bg-danger")
    uvIn.addClass("bg-success");

  } else if (data.current.uvi >= 3 && data.current.uvi <= 6) {
    uvIn.removeClass("bg-success bg-danger");
    uvIn.addClass("bg-warning text-dark");

  } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
    uvIn.removeClass("bg-warning text-dark bg-success");
    uvIn.addClass("bg-danger");

  } else {
    uvIn.removeClass("bg-warning text-dark bg-success");
    uvIn.addClass("bg-danger");
  }
}

  //5-day forecast
  function getFiveDayForecast(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherURL}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Five day forecast!!!");
        console.log(data);
        var i;
        for(i = 1; i < 6; i++){
            console.log("doit " + i*7);
            console.log(data.list[i*7].dt);
            console.log(data.list[i*7].dt_txt);
            var currentDate = data.list[i*7].dt;
            var date =  new Date(currentDate * 1000);
            console.log(date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
    
            var weatherIcon = data.list[i*7].weather[0].icon;
            var iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
            console.log(iconUrl);
            $("#dateE5"+i).text(`Date: ${month}/${day}/${year}`);
            $("#tempE5"+i).text(`Temp: ${Math.floor(data.list[i*7].main.temp)}°F`);
            $("#windE5"+i).text(`Wind:  ${Math.floor(data.list[i*7].wind.speed)} MPH`);
            $("#humidE5"+i).text(`Humidity: ${Math.floor(data.list[i*7].main.humidity)}%`);
            $("#header-icon5"+i).attr("src", iconUrl);
          
          }
      });
  }
