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
    const res = await axios.get('/api/departments');
    const depts = await res.data;
    console.log(depts);
    this.setState({
      departments: depts
    });

  }

  render(){
    console.log('rendered');
    return ( <div className='dept-container'>
      { this.state.departments.map(dept => {
            return (
              <div key={dept.id} className={`col dept-${dept.id}`}>
                <h2>{dept.name}</h2>
                <ul></ul>
              </div>
            )
          })
      }
    </div>)
  }
}

ReactDOM.render(<DepartmentColumn/>, document.querySelector('#root'));
