 import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'

import Number from './components/Numbers.js'
import Filter from './components/Filter.js'
import Submit from './components/Submit.js'



const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

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

  const handleDelete = (id) => {
    console.log("The id ", id)
    const person = persons.find(p => p.id === id)
    console.log(person)
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then(returnedPerson => {
        console.log("delete returns", returnedPerson)
        setPersons(persons.filter(person => person.id != id))
      })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <Submit addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <Number key={person.name} person={person} handleDelete={() => handleDelete(person.id)}/>)}
      </ul>
    </div>
  )

}

export default App