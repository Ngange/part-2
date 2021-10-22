import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', phone: '040-1234567' }]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
        else if(newNumber === '' && newNumber.length < 7) {
          alert(`Contact cannot be less than seven(7) digits`)
        }
        else {
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
      phone: newNumber
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


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNewName}
                />
        </div>

        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNewNumber}
                />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
        
      <h2>Numbers</h2>
      {persons.map(person => 
          <p key={person.name}>{person.name} {person.phone}</p>
          )}
      
    </div>
  )
}

export default App