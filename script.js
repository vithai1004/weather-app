let weather = {
    apiKey: "cde2936c24fe7ee19fc297104de1d38a",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
            ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind; 
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".weather-description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C"; 
        document.querySelector(".weather-humidity").innerText = "Humidity is: " + humidity + "%";
        document.querySelector(".windy").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },

// Making the search works when typping city name//
    search:function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

// Making the search works when user hitting the Enter key// 

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key== "Enter") {
        weather.search();
    }
});

// Hiding city name//
weather.fetchWeather("Chicago");