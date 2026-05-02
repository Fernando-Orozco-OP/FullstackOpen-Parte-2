import { useEffect, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (search === "") {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }

    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${search}`
        );
        const data = await response.json();

        if (data.status === 404) {
          setCountries([]);
          return;
        }

        setCountries(data);

        if (
          selectedCountry &&
          !data.some((c) => c.cca3 === selectedCountry.cca3)
        ) {
          setSelectedCountry(null);
          setWeather(null);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [search]);

  const fetchWeather = async (capital) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital?.[0]);
  };

  useEffect(() => {
    if (countries.length === 1) {
      setSelectedCountry(countries[0]);
      fetchWeather(countries[0].capital?.[0]);
    }
  }, [countries]);

  const CountryDetail = ({ country }) => (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital {country.capital?.[0]}</p>
      <p>Area {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt="flag" width="200" />

      {weather && (
        <div>
          <h3>Weather in {country.capital?.[0]}</h3>

          <p>Temperature: {weather.main?.temp}°C</p>
          <p>Humidity: {weather.main?.humidity}</p>
          <p>Wind Speed: {weather.wind?.speed}</p>
          <p>
            Weather Description:{" "}
            {weather.weather?.[0]?.description}
          </p>

          <p>Weather Icon:</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1>Country Information App</h1>

      <label>
        find countries{" "}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      {countries.length > 10 && (
        <p>Too many countries, please make your entry specific</p>
      )}

      {countries.length > 1 && countries.length <= 10 && (
        <div>
          <h3>Matching Countries:</h3>
          <ul>
            {countries.map((c) => (
              <li key={c.cca3}>
                {c.name.common}{" "}
                <button onClick={() => handleShowCountry(c)}>
                  Show Country Data
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCountry && <CountryDetail country={selectedCountry} />}
    </div>
  );
};

export default App;