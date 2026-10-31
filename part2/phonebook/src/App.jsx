import { useState , useEffect } from 'react'
import axios from 'axios'
import personService from './personService'




const PersonForm = ( {formObj} ) => {
  const {submitted, handleNameChange, handleNumChange, newName, newNum} = formObj

  return (
    <div>
      <form onSubmit={submitted}>
        <p>Name: <input value={newName} onChange={handleNameChange} /> </p>
        <p>Number: <input value={newNum} onChange={handleNumChange} /> </p>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}




const Persons = ( {showObj} ) => {
  const {list, deletion} = showObj

  return (
    <div>
      {list.map(p => {
        return (
        <div key={p.id}>
          <p> {p.name} : {p.number} <button onClick={() => deletion(p.id)}>Delete</button></p>
        </div>
        )
      })}
    </div>
  )
} 




const Filter = ({search, setSearch}) => {
  const handleChange = (event) => {
    setSearch(event.target.value)
  } 
  return (
    <div>
      Filter shown with <input value={search} onChange={handleChange} />
    </div>
  )
}




const Notification = ( {message, color} ) => {
  const error = {
    color: color,
    border: 'solid 5px',
    padding: 7,
    borderRadius: '13px' ,
    margin: '13px'
  }

  if (message === null) {
    return null
  } else {
    return (
      <div style={error}>
        {message}
      </div>
    )
  }
}




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState(null)

  const getData = () => {
    personService.getAll()
    .then(initial => {
      console.log("promise fulfilled")
      setPersons(initial)
    })
  }

  useEffect(getData, [])
  console.log(`rendered ${persons.length} persons`)


  

  const notify = (msg, color) => {
    setMessage(msg)
      setColor(color)
      setTimeout(() => {
        setMessage(null)
        setColor(null)
      }, 4000)
  } 


  const submitted = (event) => {
    const matched = persons.find(p => p.name === newName)
    event.preventDefault()

    if ( matched && matched.number === newNum ) {
      const msg = `"${newName}" is already added to phonebook`
      notify(msg, 'cyan')
    } 
    else if ( matched && matched.number !== newNum ) {
      const ask = `${newName} is already added to phonebook, replace the old number with a new one?`
      const updatedPerson = { ...matched, number: newNum }
      if (confirm(ask)) {
        personService.update(matched.id, updatedPerson)
        .then(returned => {
          setPersons(persons.map(p => p.id !== returned.id? p : updatedPerson))
          const msg = `Updated ${newName}'s number`
          notify(msg, 'green')
        })
        .catch(err => {
          setPersons(persons.filter(p => p.name !== newName))
          const msg = `Information of "${newName}" was already removed from server`
          notify(msg, 'red')
        })
        console.log(updatedPerson)
      }
    } 
    else {
      const added = {name: newName, number: newNum}
      personService.add(added)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        const msg = `Added "${newName}"`
        notify(msg, 'green')
      })
    }
     setNewName('')
     setNewNum('')
   }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const addPersons = {submitted, handleNameChange, handleNumChange, newName, newNum}




  const filteredList = persons.filter(p => p.name.includes(search))
  const list = !search? persons : filteredList

  const deletion = (id) => {
    personService.remove(id).then(removedPer => {
      console.log(`removed ${removedPer.name}`)
      setPersons(persons.filter(p => p.id !== removedPer.id))
      const msg = `Deleted "${removedPer.name}" from phonebook`
      notify(msg, 'orange')
    })
  }

  const showNDelete = {list, deletion}




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color} />
      <Filter search={search} setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm formObj={addPersons} />
      <h3>Numbers</h3>
      <Persons showObj={showNDelete} />
    </div>
  )
}

export default App