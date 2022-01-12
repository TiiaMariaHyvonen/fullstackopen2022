import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries.js'





const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <div>
      find countries: <input
        value={newFilter}
        onChange={handleFilterChange}/>
      </div>
      <Countries countries={filteredCountries} setFilter={setFilter}/>
    </div>
  )
}

export default App