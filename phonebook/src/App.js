import React, { useState, useEffect } from 'react'
import contactsServices from './services/contacts'

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

const Persons = ({filtered, remove}) => {
  return(
    filtered.map(person => 
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => remove(person.id, person.name)}>delete</button> 
      </p>
      )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    contactsServices
      .getAll()
      .then(initialContact => {
        setPersons(initialContact)
      })
  }, [])
  
  // Check if person is already in the phoneboook.
  const nameExists = (() =>
    persons.some((person) =>
      person.name.toLowerCase() === newName.toLowerCase())
    )

  const exists = (newperson) => {
    const found = persons.find((person) =>
    person.name.toLowerCase() === newName.toLowerCase())
    const check = window.confirm(`${newperson.name} is already added to the phonebook, replace the old number with a new one?`)

    if (check) {
      contactsServices
      .update(found.id, newperson)
      .then(response => {
        setPersons(person => person.id !== found.id ? person : response)
        alert(`${newperson.name}s' number is updated`)
    })
    }

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
          contactsServices
          .create(obj)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName('')
            setNewNumber('')
          })
          
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`) ) {
      contactsServices
      .removeContact(id)
    }
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
      
      <Persons filtered={filtered} remove={handleDelete} />
      
    </div>
  )
}

export default App