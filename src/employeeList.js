import React from 'react'

const EmployeeList = (props) => {
  return props.people.map(person => {
    return (<div className='emp-col' key={person.id}>
      <p>{person.name}</p>
      <button className="fire" onClick={() => props.delete(person.id)}>Fire</button>
      {person.departmentId ?  <button className="remove" onClick={() => props.remove(person)}>X Remove from Dept</button> : null}
      </div>)}
    )
}

export default EmployeeList
