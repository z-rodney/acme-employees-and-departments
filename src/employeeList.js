import React from 'react'
import ReactDOM from 'react-dom'

const employeeList = (props) => {
  return props.map(emp => {
    <div key={emp.id}>
      <h3>{emp.name}</h3>
      <button>Fire</button>
      <button>Remove from Dept</button>
    </div>
    }
  )
}

export default employeeList
