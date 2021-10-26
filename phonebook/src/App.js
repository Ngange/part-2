import React, { useState, useEffect } from 'react'
import contactsServices from './services/contacts'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [cssName, setCssName] = useState(null)

  useEffect(() => {
    contactsServices
      .getAll()
      .then(initialContact => {
        console.log(initialContact)
        setPersons(initialContact)
      })
  }, [])
  
  // Check if person is already in the phoneboook.
  const nameExists = (() =>
    persons.some((person) =>
      person.name.toLowerCase() === newName.toLowerCase())
    )

    //Checks if person exists
  const exists = (newPerson) => {
    const found = persons.find((person) =>
    person.name.toLowerCase() === newName.toLowerCase())
    const check = window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)

    if (check) {
      contactsServices
      .update(found.id, newPerson)
      .then(response => {
        setPersons(person => person.id !== found.id ? person : response)
        setMessage(`${newPerson.name}s' number is changed`)
        setCssName("success")
        setTimeout(() => {
          setMessage(null)
          setCssName(null)
        }, 5000);
      })
      .catch(error => {
        setMessage(`Information of ${newPerson.name} has already been removed from the server!`)
        setCssName("error")
        setTimeout(() => {
          setMessage(null)
          setCssName(null)
        }, 5000);
      })
    }

  }

  /* set's the name of the new person.
    c
   */
    const setContact = (obj) => {
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
            setMessage(`Added ${obj.name}`)
            setCssName("success")
            setTimeout(() => {
              setMessage(null)
              setCssName(null)
            }, 10000);
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
    return setContact(parsonObject)
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


  // Handles the deletion of contacts
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`) ) {
      setMessage(`Deleted ${name}`)
      setCssName("success")
      setTimeout(() => {
        setMessage(null)
        setCssName(null)
      }, 10000);
      contactsServices
      .removeContact(id)
      .catch(error => {
        setMessage(`Information of ${name} has already been removed from the server!`)
        setCssName("error")
        setTimeout(() => {
          setMessage(null)
          setCssName(null)
        }, 10000);
      })

      //to refresh the contact and exclude deleted contact
      contactsServices.getAll().then(response => {
        let data = []
        // eslint-disable-next-line array-callback-return
        response.map(r => {
          if (r.id !== id) {
            console.log(r)
            data.push(r)
            
          }
        })
        setPersons(data)
      })
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

      <Notification message={ message } cssName={cssName} />
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