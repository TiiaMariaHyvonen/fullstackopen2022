import React, { useState } from 'react'

const Number = ({person}) => {
  return (
    <> 
      <li> {person.name} {person.number ? person.number : '' } </li>
    </>
  )
}

const Numbers = ({persons}) => {
  return (
    <ul>
      {persons.map(person => <Number key={person.name} person={person}/>)}
    </ul>
  )
}

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <>
      filter shown with: <input
      value={newFilter}
      onChange={handleFilterChange}/>
    </>
  )
}

const Submit = ({addNumber, newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
    <div>
    <form onSubmit={addNumber}> 
      <div>
        name: <input 
        value={newName}
        onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
        value={newNumber}
        onChange={handleNumberChange}
        />
        </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
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