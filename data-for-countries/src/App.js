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

const BasicData = ({countries}) => {
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


        </div>
      )
    })
  )
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <p>Too many matches, please be more specific</p>
  }
  else if (countries.length === 1) {
    return (
      <BasicData countries={countries} />
    )
  }
  return (
    countries.map(country => {
      return (
        <div key={country.tld}>
          <p>{country.name.common}</p>
        </div>
      )
    })
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
    .then(response => {
      /* console.log(response.data) */
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  const filter = countries.filter(country => {
    if (search === '') {
    return null
    }
    else if(country.name.common.toLowerCase().includes(search.toLowerCase())) {
      return country.name.common
    }
    return null
  })


  return (
    <div>
      <Input 
        type="text"
        handleSearch={handleSearch} 
      />

      <Countries countries={filter} />
      
    </div>
  );
}

export default App;