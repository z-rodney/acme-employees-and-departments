import React from 'react'
import axios from 'axios'

const EmployeeList = (props) => {

  return props.people.map(person => {
    const deletePerson = async (id) => {
      await axios.delete(`api/employees/${id}`)
    }
    const deleteDept = async (id) => {
      await axios.put(`api/employees/${id}`)
    }
    return (<div key={person.id}>
      <p>{person.name}</p>
      <button className="fire" onClick={async () => await deletePerson(person.id)}>Fire</button>
      <button className="remove" onClick={async () => await deleteDept(person.id)}>X Remove from Dept</button>
    </div>)
    }
  )
}

export default EmployeeList
