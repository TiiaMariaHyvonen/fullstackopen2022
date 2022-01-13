import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Number from './components/Numbers.js'
import Filter from './components/Filter.js'
import Submit from './components/Submit.js'
import Notification from './components/Notification.js'



const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber}
        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setMessage(`${changedPerson.name}'s number has been changed`)
          setTimeout(() => {setMessage(null)}, 5000)
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(
            `Number '${person.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          
        })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setMessage(`Added '${personObject.name}'`)
        setTimeout(() => {setMessage(null)}, 5000)
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
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then(returnedPerson => {
        setMessage(`Deleted' ${person.name}'`)
        setTimeout(() => {setMessage(null)}, 5000)
        setPersons(persons.filter(person => person.id != id))
      })
      .catch(error => {
        setErrorMessage(
          `Number '${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} className="message" />
      <Notification message={errorMessage} className="error"/>
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