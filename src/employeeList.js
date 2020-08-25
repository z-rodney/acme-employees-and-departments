import React from 'react'

const EmployeeList = (props) => {
  if (props.deptId) {
    return props.people.map(person => {
      return (<div key={person.id}>
        <p>{person.name}</p>
        <button className="fire" id={`fire-/api/employees/${person.id}`}>Fire</button>
        <button className="remove" id={`remove-/api/employees/${person.id}`}>X Remove from Dept</button>
      </div>)
      }
    )
  } else {
    return props.people.map(person => {
      return (<div key={person.id}>
        <p>{person.name}</p>
        <button className="fire" id={`fire-/api/employees/${person.id}`}>Fire</button>
      </div>)
      }
    )
  }
}

export default EmployeeList
