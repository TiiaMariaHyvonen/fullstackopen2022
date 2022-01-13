 import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons.js'

import Numbers from './components/Numbers.js'
import Filter from './components/Filter.js'
import Submit from './components/Submit.js'



const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  //This happens in the beginnig: data is retrieved from the server
  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  //This happens when a new phone contact is added: new object is sent to server, it is added to
  //the state and name and number fields are emptied
  const addNumber = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log(personObject)
      personService
      .create(personObject)
      .then(returnedPerson => {
        console.log("returnedPerson", returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <Submit addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Numbers persons={personsToShow} />
    </div>
  )

}

export default App