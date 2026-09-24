import { useState } from 'react'

const PersonForm = ( {formObj} ) => {
  const {persons, setPersons, newName, setNewName, newNum, setNewNum} = formObj

  const submitted = (event) => {
    event.preventDefault()
    if ( persons.some(p => p.name === newName) ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const added = {name: newName, number: newNum}
      setPersons(persons.concat(added))
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

const Persons = ({list}) => {
  return (
    <div>
      {list.map(p => <p key={p.name}> {p.name} : {p.number} </p>)}
    </div>
  )
} 

const Filter = () => {
  return (
    <div>
      Filter shown with <input value={search} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const statesObj = {persons, setPersons, newName, setNewName, newNum, setNewNum}

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm formObj={statesObj} />
      <h2>Numbers</h2>
      <Persons list={persons}/>
    </div>
  )
}

export default App