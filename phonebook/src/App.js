import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }]) 
  const [ newName, setNewName ] = useState('')

  // Check if person is already in the phoneboook.
  const contactExists = (() =>
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
      if(contactExists()) {
          exists(obj)
      }
      else {
        if(newName === '') {
        alert(`Cannot add an empty string  as a contact`)
        }
        else {
          setPersons(persons.concat(obj))
          setNewName('')
        }
      }
    } 

  const addContact = (event) => {
    event.preventDefault()
    const parsonObject = {
      name: newName
    }

    return setcontact(parsonObject)
  } 

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
        
      <h2>Numbers</h2>
      {persons.map(person => 
          <p key={person.name}>{person.name}</p>
          )}
      
    </div>
  )
}

export default App