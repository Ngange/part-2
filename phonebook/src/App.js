import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = ({onSubmit, name, handleName, number, handleNumber}) => {
  return(
    <form onSubmit={onSubmit}>
        <div>
          name: <input 
                  value={name}
                  onChange={handleName}
                />
        </div>

        <div>
          number: <input 
                  value={number}
                  onChange={handleNumber}
                />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({handleSearch}) => {
  return(
    <div>
    <span>filter shown with</span><input 
                  placeholder= 'Search....'
                  onChange={handleSearch}
                />
    </div>
  )
}

const Persons = ({filtered}) => {
  return(
    filtered.map(person => 
      <p key={person.name}>{person.name} {person.number}</p>
      )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  // Check if person is already in the phoneboook.
  const nameExists = (() =>
    persons.some((person) =>
      person.name.toLowerCase() === newName.toLowerCase())
    )

  const exists = (newperson) => {
    alert(`${newperson.name} is already add to phonebook`)
  }

  /* set's the name of the new person.
    c
   */
    const setcontact = (obj) => {
      if(nameExists()) {
        exists(obj)
      }  
      else {
        if(newName === '' ) {
        alert(`Cannot add an empty string  as a contact`)
        }
        else if(newNumber === '') {
          alert(`Contact cannot be less than seven(7) digits`)
        }
        else if(newNumber.length < 7) {
          alert(`Contact cannot be less than seven(7) digits`)
        }
        else {
          axios.post('http://localhost:3001/persons', obj)
          setPersons(persons.concat(obj))
          setNewName('')
          setNewNumber('')
        }
      }
    }  

  const addContact = (event) => {
    event.preventDefault()
    const parsonObject = {
      name: newName,
      number: newNumber
    }
    return setcontact(parsonObject)
  } 

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  const filtered = persons.filter(person => {
    if (search === '') {
    return person
    }
    else if(person.name.toLowerCase().includes(search.toLowerCase())) {
      return person
    }
    return null
  })


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} />

      <h3>Add New Contact</h3>

      <PersonForm
        onSubmit={addContact}
        name={newName}
        handleName={handleNewName}
        number={newNumber}
        handleNumber={handleNewNumber}
      />
      
        
      <h2>Numbers</h2>
      
      <Persons filtered={filtered} />
      
    </div>
  )
}

export default App