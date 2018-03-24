var weatherStartTime = WeatherFinder.getWeatherTimeFloor(new Date()).getTime();
var weatherStartHour = WeatherFinder.getEorzeaHour(weatherStartTime);
var zone = 'Eureka';
var eightHours = 8 * 175 * 1000;
var fourHours = eightHours / 2;
var twoHours = fourHours / 2;
var sixHours = twoHours * 3;
var twentyFourHours = eightHours * 3;

var weather = WeatherFinder.getWeather(weatherStartTime, zone);
var gales = [];
var tries = 0,
  matches = 0;

while (tries < 1000 && matches < 50) {
  if (weather == 'Gales') {
    var weatherDate = new Date(weatherStartTime);
    var weatherData = {
      pazuzuWindow: weatherDate.toLocaleString(),
      wraithWindow: new Date(getWraithWindow(weatherStartTime)).toLocaleString(),
      prevWraithWindow: new Date(getWraithWindow(weatherStartTime - twentyFourHours)).toLocaleString()
    }
    gales.push(weatherData)
    matches++;

    weatherStartTime += twentyFourHours; // Increment by 24 Eorzean Hours for next Paz window
  } else {
    weatherStartTime += eightHours; // Increment by 8 Eorzean hours
  }
  weatherStartHour = WeatherFinder.getEorzeaHour(weatherStartTime);
  weather = WeatherFinder.getWeather(weatherStartTime, zone);
  tries++;
}

function getWraithWindow(wst) {
  switch (WeatherFinder.getEorzeaHour(wst)) {
    case 0:
      return wst - sixHours;
    case 8:
      return wst - (eightHours + sixHours);
    case 16:
      return wst - ((2 * eightHours) + sixHours);
  }
}

for (var i = 0; i < gales.length; i++) {
  $('<tr><td>' + gales[i].pazuzuWindow + '</td><td>' + gales[i].wraithWindow + '</td><td>' + gales[i].prevWraithWindow + '</td></tr>').appendTo($('#results > tbody'));
}
