import React from 'react'

const EmployeeList = (props) => {
  return props.people.map(person => {
    return (<div key={person.id}>
      <p>{person.name}</p>
      <button className="fire">Fire</button>
      <button className="remove">X Remove from Dept</button>
    </div>)
    }
  )
}

export default EmployeeList
