import react, { useEffect, useState } from "react";
import './App.css';

function App() {
  const initial = {
    "coord": {
      "lon": 70.4167,
      "lat": 22.5667
    },
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 33.66,
      "feels_like": 31.79,
      "temp_min": 33.66,
      "temp_max": 33.66,
      "pressure": 1016,
      "humidity": 22,
      "sea_level": 1016,
      "grnd_level": 1012
    },
    "visibility": 10000,
    "wind": {
      "speed": 6.63,
      "deg": 30,
      "gust": 6.57
    },
    "clouds": {
      "all": 0
    },
    "dt": 1676192155,
    "sys": {
      "type": 1,
      "id": 9061,
      "country": "IN",
      "sunrise": 1676166748,
      "sunset": 1676207570
    },
    "timezone": 19800,
    "id": 1272699,
    "name": "Dhrol",
    "cod": 200
  }
  const [city, setCity] = useState(initial);
  const [search, setSearch] = useState("dhrol");
  const [name, setName] = useState("dhrol");
  

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b0bffc696e8089f27c0523b2e7e9bce5`;
      const respose = await fetch(url);
      const jsonrespose = await respose.json();
      console.log(jsonrespose);
      setCity(jsonrespose);
    }
    fetchApi();
  }, [name])
  let desc = "Clouds";
  if (city.cod==="200") {
    if (city.weather[0].id / 100 === 2) {
      desc = "Thunderstorm";
    }
    else if (city.weather[0].id / 100 === 3) {
      desc = "Drizzle";
    }
    else if (city.weather[0].id / 100 === 5) {
      desc = "Rain";
    }
    else if (city.weather[0].id / 100 === 6) {
      desc = "Snow";
    }
    else if (city.weather[0].id / 100 === 7) {
      desc = "Atmosphere";
    }
    else if (city.weather[0].id === 800) {
      desc = "Clear";
    }
    else if (city.weather[0].id / 100 === 8) {
      desc = "Clouds";
    }
  }
  let backUrl = `images/${desc}.jpeg`;
  return (
    <>
      {city.cod ==="404" ? <h1 style={{color:"white"}}>No Data Found</h1> : (
        <div>
          <div className="weather-app" style={{ backgroundImage: `url(${backUrl})` }}>
            <div className="container">
              <h3 className="brand">The weather</h3>
              <div>
                <h1 className="temp">{city.main.temp}&#176;C</h1>
                <div className="city-name">
                  <h1 className="name">{name}</h1>
                  <small>
                    <span className="date">And feels like {city.main.feels_like}&#176;C</span>
                  </small>
                </div>
              </div>

              <div className="weather">
                <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                  className="icon"
                  alt="icon"
                  width="50"
                  height="50" />
                <span className="condition">{city.weather[0].main}</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <form action="/" id="locationInput">
              <input type="text"
                className="search"
                placeholder="search location.."
                onChange={
                  (event) => {
                    setSearch(event.target.value)
                  }
                }
              />
              <button type="submit" className="submit" onClick={(e) => {
                e.preventDefault();
                setName(search);
              }}>
                <i className="fas fa-search"></i>
              </button>
            </form>

            <ul className="cities">
              <li className="city">New york</li>
              <li className="city">California</li>
              <li className="city">Paris</li>
              <li className="city">Tokyo</li>
            </ul>

            <ul className="details">
              <h4>weather Details</h4>
              <li>
                <span>cloudy</span>
                <span className="cloud">{city.clouds.all}%</span>
              </li>
              <li>
                <span>Humidity</span>
                <span className="humidity">{city.main.humidity}%</span>
              </li>
              <li>
                <span>Wind</span>
                <span className="wind">{city.wind.speed}km/h</span>
              </li>
            </ul>
          </div>
        </div>
      )}

    </>
  );
}

export default App;
