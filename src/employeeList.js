import React from 'react'

const FireButton = (props) => {
  return <button className="fire" id={`fire-/api/employees/${props.id}`}>Fire</button>
}

const RemoveButton = (props) => {
  return <button className="remove" id={`remove-/api/employees/${props.id}`}>X Remove from Dept</button>
}

const EmployeeList = (props) => {
  return props.people.map(person => {
    const buttons = props.deptId ? <span> <FireButton id={person.id}/> <RemoveButton id={person.id}/>  </span>: <FireButton id={person.id}/>;
    return (<div key={person.id}>
      <p>{person.name}</p>
      {buttons}
      </div>)}
    )
}

export default EmployeeList
