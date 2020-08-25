import React from 'react'
import EmployeeList from './employeeList'

const DepartmentList = (props) => {
  return props.departments.map(dept => {
    const myEmps = props.employees.filter(elem => elem.departmentId === dept.id)
    return (<div key={dept.id || 0} className={`col dept-${dept.name}`}>
    <h2>{`${dept.name || 'Employees Without Departments'} (${myEmps.length})`}</h2>
    <EmployeeList deptId={dept.id} people={myEmps}/>
    </div>
    )
  })
}

export default DepartmentList
