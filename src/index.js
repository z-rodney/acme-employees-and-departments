import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import DepartmentList from './departmentList'

class DepartmentColumn extends React.Component {
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
    console.log(depts, emps);
    this.setState({
      departments: depts,
      employees: emps
    });

  }

  render(){
    const stateObj = this.state;
    console.log('rendered', stateObj);
    return ( <div className='dept-container'>
       <DepartmentList departments={stateObj.departments}/>
    </div>)
  }
}

ReactDOM.render(<DepartmentColumn/>, document.querySelector('#root'));
