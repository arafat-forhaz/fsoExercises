import { useState , useEffect } from 'react'
import axios from 'axios'
import personService from './personService'




const PersonForm = ( {formObj} ) => {
  const {persons, setPersons, newName, setNewName, newNum, setNewNum} = formObj

  const submitted = (event) => {
    const matched = persons.find(p => p.name === newName)
    event.preventDefault()

    if ( matched && matched.number === newNum ) {
      alert(`${newName} is already added to phonebook`)
    } 
    else if ( matched && matched.number !== newNum ) {
      const ask = `${newName} is already added to phonebook, replace the old number with a new one?`
      const updatedPerson = { ...matched, number: newNum }
      if (confirm(ask)) {
        personService.update(matched.id, updatedPerson)
        .then(returned => {
          setPersons(persons.map(p => p.id !== returned.id? p : updatedPerson))
        })
        console.log(updatedPerson)
      }
    } 
    else {
      const added = {name: newName, number: newNum}
      personService.add(added)
      .then(addedPerson => 
        setPersons(persons.concat(addedPerson))
      )
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
  const {persons, setPersons, search} = showObj

  const filteredList = persons.filter(p => p.name.includes(search))
  const list = !search? persons : filteredList

  const deletion = (id) => {
    personService.remove(id).then(removedPer => {
      console.log(`removed ${removedPer.name}`)
      setPersons(persons.filter(p => p.id !== removedPer.id))
    })
  }

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




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')

  const getData = () => {
    personService.getAll()
    .then(initial => {
      console.log("promise fulfilled")
      setPersons(initial)
    })
  }

  useEffect(getData, [])
  console.log(`rendered ${persons.length} persons`)

  const addPersons = {persons, setPersons, newName, setNewName, newNum, setNewNum}
  const showNDelete = {persons, setPersons, search}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm formObj={addPersons} />
      <h3>Numbers</h3>
      <Persons showObj={showNDelete} />
    </div>
  )
}

export default App