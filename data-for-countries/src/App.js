import React, { useState, useEffect } from "react";
import axios from 'axios'



const Input = ({handleSearch, type }) => {
  return (
    <>
      <span>find country</span>
      <input 
        type={type}
        placeholder="Search....."  
        onChange={handleSearch}
      />
    </>
  )
}

const Languages = ({languages}) => {
  const languageArray = Object.values(languages)
  return (languageArray.map(language => {
    return <li key={language}>{language}</li>
  }))

}

const BasicData = ({countries, weatherData}) => {
  return (
    countries.map(country => {
      const lang = country.languages
      
      console.log(lang)
      return (
        <div key={country.tld}>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>

          <h2>Languages</h2>

          <ul>
            <Languages languages={lang} />
          </ul>
          
          <img src={country.flags['svg']}  alt={`flag of ${country.name.common}`} />

          <h2>weather for {country.capital}</h2>

          <p><strong>temperature:</strong> {weatherData.temperature} Celcius</p>

          <img
            src={weatherData.weather_icons[0]}
            alt={weatherData.weather_descriptions[0]}
          />

          <p><strong>wind:</strong> {weatherData.wind_speed} mph direction {weatherData.wind_dir} </p>

        </div>
      )
    })
  )
}

const Countries = ({countries, showCountry, weather}) => {
  console.log('wed', weather);
  if (countries.length > 10) {
    return <p>Too many matches, please be more specific</p>
  }
  else if (countries.length === 1) {
    return (
      <BasicData countries={countries} weatherData={weather} />
    )
  }
  return (
    countries.map(country => {
      const name = country.name.common
      return (
        <div key={country.tld}>
          <p>
            {name}
            <button onClick={() => showCountry(name)} >show</button>
          </p>
        </div>
      )
    })
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState([])

  console.log(weather)

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
    .then(response => {
      if (search !== "") {
        const result = response.data.filter(country =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
        setCountries(result);
      }
    })
  }, [search])

  useEffect(() => {
    const city = countries.map(country => country.capital)
    const baseUrl = 'http://api.weatherstack.com/current'
    const ACCESS_KEY = process.env.REACT_APP_API_KEY
    
    if (city[0]) {
      axios.get(`${baseUrl}?access_key=${ACCESS_KEY}&query=${city}`)
      .then(response => {
        return response.data
      }).then(response => {
        console.log('res', response);
        setWeather(response.current)
      })
    }
    
    }, [ countries ])

  const handleSearch = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  

  const handleClick = (name) => {
    setSearch(name)
  }

/*   const filter = countries.filter(country => {
    if (search === '') {
    return null
    }
    else if(country.name.common.toLowerCase().includes(search.toLowerCase())) {
      return country.name.common
    }
    return null
  })

  console.log('filter', filter) */


  return (
    <div>
      <Input 
        type="text"
        handleSearch={handleSearch} 
      />

      <Countries 
        countries={countries} 
        showCountry={handleClick}
        weather={weather}
      />
      
    </div>
  );
}

export default App;