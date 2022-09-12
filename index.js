

timer();
getLocation();


function timer(){
  let d = new Date();
  let status = false;
  var timer = setInterval(function(){
      document.getElementById('date').innerHTML = formatDate(d)
      if (status == true) {
          clearInterval(timer);
      }
  }, 1000);
}





function formatDate(date) {
    let d = new Date();
    day = get_day(d.getDay());
    month = get_month(d.getMonth());
    return `${day}, ${month} ${d.getDate()}, ${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

function get_month(month){
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return monthArr[month]
}

function get_day(day){
    const dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return dayArr[day-1];
}


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
  }

  function showPosition(position) {
    API_KEY = 'a83330f55970b2cb96f4d7cc3bd9bc05'
    console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
    userAction(position.coords.latitude, position.coords.longitude, API_KEY)
  }

  const userAction = async (latitude, longitude, key) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`);
    const myJson = await response.json(); //extract JSON from the http response
    document.getElementById("nama-kota").innerHTML = myJson.name
    document.getElementById("cuaca").innerHTML = myJson.weather[0].description
    document.getElementById("suhu-metrik").innerHTML = myJson.main.temp+"°C";
    sunrise = new Date(myJson.sys.sunrise * 1000);
    sunset = new Date(myJson.sys.sunset * 1000);
    document.getElementById("icon-cuaca").src = `http://openweathermap.org/img/wn/${myJson.weather[0].icon}@4x.png`
    document.getElementById("sunrise-time").innerHTML = `Sunrise at : ${sunrise.getHours()}:${sunrise.getMinutes()}`
    document.getElementById("sunset-time").innerHTML = `Sunset at : ${sunset.getHours()}:${sunset.getMinutes()}`
    // do something with myJson
  }

  // YANG PUNYA API = https://openweathermap.org/current

  // {
  //   "coord": {
  //     "lon": 110.432,
  //     "lat": -7.771
  //   },
  //   "weather": [
  //     {
  //       "id": 803,
  //       "main": "Clouds",
  //       "description": "broken clouds",
  //       "icon": "04n"
  //     }
  //   ],
  //   "base": "stations",
  //   "main": {
  //     "temp": 295.33,
  //     "feels_like": 295.93,
  //     "temp_min": 295.33,
  //     "temp_max": 295.33,
  //     "pressure": 1010,
  //     "humidity": 89,
  //     "sea_level": 1010,
  //     "grnd_level": 994
  //   },
  //   "visibility": 10000,
  //   "wind": {
  //     "speed": 1.6,
  //     "deg": 252,
  //     "gust": 3.1
  //   },
  //   "clouds": {
  //     "all": 55
  //   },
  //   "dt": 1658838590,
  //   "sys": {
  //     "country": "ID",
  //     "sunrise": 1658789531,
  //     "sunset": 1658831827
  //   },
  //   "timezone": 25200,
  //   "id": 1645518,
  //   "name": "Depok",
  //   "cod": 200
  // }
