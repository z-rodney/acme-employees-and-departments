import React from 'react'
import EmployeeList from './employeeList'

const DepartmentList = (props) => {
  return props.departments.map(dept => {
        return (<div key={dept.id} className={`col dept-${dept.name}`}>
        <h2>{dept.name}</h2>
        <EmployeeList people={dept.employees}/>
        </div>
        )
      })
}

export default DepartmentList
