import React, { useState, useEffect } from 'react'
import axios from "axios"

const App = () =>{
  const [query, setQuery] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const uri = "https://restcountries.eu/rest/v2/all"
  useEffect(() =>{
    axios.get(uri)
      .then((response) => {
        const countries = response.data
        setAllCountries(countries)
        setFilteredCountries(countries)
      })
  }
  ,[])

  const queryHandler = (event) => {
    const query = event.target.value.toLowerCase()
    setQuery(query)
    const filteredCountries = allCountries.filter(country => country.name.toLowerCase().includes(query))
    setFilteredCountries(filteredCountries)
  }

  return(
    <div>
      <Form query={query} handler={queryHandler}/>
      <Result filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries}/>
    </div>
  )
}

const Form = ({query, handler}) => (
  <form>
    find countries <input value={query} onChange={handler}/>
  </form>
)

const Result = ({filteredCountries, setFilteredCountries}) => {
  const length = filteredCountries.length
  if (length > 10){
    return (<p>Too many matches, specify another filter</p>)
  }
  if (length > 1){
    return ( <CountryList countries={filteredCountries} setFilteredCountries={setFilteredCountries}/> )
  }
  if (length === 1){
    return (<Country country={filteredCountries[0]}/>)
  }
  if (length === 0){
    return (<p>No countries found</p>)
  }
}

const CountryList = ({countries, setFilteredCountries}) => {
  const action = (country) => {
    setFilteredCountries([country])
  }
  return(
    countries.map(country => <p key={country.alpha3Code}>
      {country.name}
      <button onClick={() => action(country)}>show</button>
    </p>)
  )
}

const Country = ({country}) => {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY.trim()
  const uri = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
  const [weather, setWeather] = useState({
    current:{
      weather_icons:[""],
      temperature:"",
      wind_degree:"",
      wind_speed:""
    }
  })
  useEffect(() =>{
    axios.get(uri)
      .then((response) => {
        setWeather(response.data)
      })
    }
  ,[uri])
  console.log(weather.current)
  return(
  <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img style={{width:"300px"}} src={country.flag} alt={`flag of ${country.name}`}/>
    <h2>Weather in {country.capital}</h2>
    <p><b>temperature:</b> {weather.current.temperature}</p>
    <img style={{width:"50px"}} src={weather.current.weather_icons[0]} alt="weather icon"/>
    <p><b>wind:</b> {weather.current.wind_speed} kph bearing {weather.current.wind_degree}</p>
  </div>
  )
}

export default App;
