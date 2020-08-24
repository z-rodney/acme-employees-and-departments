import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

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
    console.log('rendered');
    return ( <div className='dept-container'>
       { this.state.departments.map(dept => {
            return (
              <div key={dept.id} className={`col dept-${dept.id}`}>
                <h2>{dept.name}</h2>
                <ul>{dept.employees.map(emp => {
                  return (<li key={emp.id}>{emp.name}
                  <p> <button>Fire</button>
                  <button>Remove from Dept</button>
                  </p>
                  </li>)
                })}</ul>
              </div>
            )
          })
      }
    </div>)
  }
}

ReactDOM.render(<DepartmentColumn/>, document.querySelector('#root'));
