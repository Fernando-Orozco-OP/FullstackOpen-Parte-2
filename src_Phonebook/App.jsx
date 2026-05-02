const Header = (props) => { return ( <div> <h1>{props.course.name}</h1> </div> ); }; 

const Part = (props) => { 
  return ( 
    <div> 
      <p> {props.part} {props.exercises} </p> 
    </div> 
  ); 
}; 

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Course = (props) => { 
  return ( 
    <div> 
      <Header course={props.course} /> 
      <Content course={props.course} /> 
      <Total course={props.course} /> 
    </div> 
  ); 
}; 

const Total = (props) => {
  const total = props.course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return <p><strong>total of {total} exercises</strong></p>;
};

import { useEffect, useState } from 'react'

const Name = (props) => {
  return (
    <div>
      <p>{props.name}{props.number}</p>
    </div>
  )
}

const Notification = ({ Successmessage }) => {
  if (Successmessage === null) {
    return null
  }

  return (
    <div className="success">
      {Successmessage}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.nameValue} onChange={props.nameOnChange} />
      </div>
      <div>
        number: <input value={props.numberValue} onChange={props.numberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person => (
        <p key={person.id}>{person.name}: {person.number}</p>
      ))}
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
  const [searchName, setSearchName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('Search name changed:', searchName)
    setFilteredPersons(
      persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    )
  }, [searchName, persons])
  console.log('Filtered persons:', filteredPersons) 

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))

      axios.post('/api/persons', personObject)
       .then(response => {
         console.log('Person added:', response.data)
       })
       .catch(error => {
         console.error('Error adding person:', error)
       })

    setPersons(persons.concat(personObject))
    setFilteredPersons(filteredPersons.concat(personObject))
    setNewName('')
    setNewNumber('')
    setSuccessMessage(`Added ${newName}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

const deletePerson = (id) => {
  const person = persons.find(p => p.id === id)
  if (window.confirm(`Delete ${person.name}?`)) {
    axios.delete(`/api/persons/${id}`)
      .then(response => {
        console.log('Person deleted:', response.data)
        setPersons(persons.filter(p => p.id !== id))
        setFilteredPersons(filteredPersons.filter(p => p.id !== id))
        setSuccessMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.error('Error deleting person:', error)
      })
  }
}

const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleSearchChange = (event) => {
  console.log(event.target.value)
  setSearchName(event.target.value)
}

persons.filter (person => person.name.includes(searchName))


  return (
    <div>
      <Notification Successmessage={successMessage} />
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
       <Filter value={searchName} onChange={handleSearchChange} />
        <h2>Add a new</h2>
        <PersonForm
          nameValue={newName}
          numberValue={newNumber}
          nameOnChange={handleNameChange}
          numberOnChange={handleNumberChange}
          onSubmit={addPerson}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App