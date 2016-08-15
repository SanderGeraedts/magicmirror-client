function module_weather_getWeather() {
	var config = JSON.parse(document.getElementById('config').innerHTML);

	var url = "http://api.openweathermap.org/data/2.5/weather?q=Best,NL&appid=" + config.Weather_API_Key;

	var img = $('#weather-icon')[0];
	var text = $('#weather-text')[0];

	$.getJSON(url, function(data) {
		var temp = data.main.temp;
		var description = data.weather[0].description;
		var img_icon = data.weather[0].icon;

		temp = temp - 273.15;
		img_icon = img_icon.slice(0, 2);

		text.textContent = Math.round(temp*10)/10 + '\xB0C - ' + description;
		img.alt = description;

		var img_src = "assets/img/" + img_icon + ".png";
		img.src = img_src;
		setTimeout(module_weather_getWeather, 600000);
	});
}