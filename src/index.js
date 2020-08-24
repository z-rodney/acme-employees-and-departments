import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import DepartmentList from './departmentList'

class Main extends React.Component {
  constructor(){
    super(),
    this.state = {
      departments: [],
      employees: []
    }
  }

  async componentDidMount(){
    const [deptRes, empRes] = await Promise.all([
      axios.get('/api/departments'),
      axios.get('/api/employees')
    ]);

    const [depts, emps] = await Promise.all([
      deptRes.data,
      empRes.data
    ]);

    depts.unshift({id: 0,
      employees: emps.filter(emp => emp.departmentId === null)
    })

    this.setState({
      departments: depts,
      employees: emps
    });

  }

  render(){
    return ( <div className='dept-container'>
       <DepartmentList departments={this.state.departments}/>
    </div>)
  }
  //TODO: re-render components on click
}

ReactDOM.render(<Main/>, document.querySelector('#root'));
