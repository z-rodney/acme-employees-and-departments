import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import DepartmentList from './departmentList'

const findPath = (str) => {
  return str.split('-')[1]
}

class Main extends React.Component {
  constructor(){
    super(),
    this.state = {
      departments: [{id: null}],
      employees: []
    },
    this.handleClickEvent = this.handleClickEvent.bind(this)
  }

  async loadData(){
    const [deptRes, empRes] = await Promise.all([
      axios.get('/api/departments'),
      axios.get('/api/employees')
    ]);
    const [depts, emps] = await Promise.all([
      deptRes.data,
      empRes.data
    ]);
    depts.unshift({id: null})
    return {depts, emps}
  }

  async componentDidMount(){
    const { depts, emps } = await this.loadData();
    this.setState({
      departments: depts,
      employees: emps
    });
    ReactDOM.findDOMNode(this).addEventListener('click', this.handleClickEvent)
  }

  componentWillUnmount(){
    ReactDOM.findDOMNode(this).removeEventListener('click', this.handleClickEvent)
  }

  async handleClickEvent(e){
    if (e.target.tagName == 'BUTTON') {
      const path = findPath(e.target.id);
      //console.log(e);
      e.target.className === 'fire' ? await axios.delete(path) : await axios.put(path);
      const { depts, emps } = await this.loadData();
      this.setState({
        departments: depts,
        employees: emps
      });
      }
    }

  render(){
    const { employees, departments } = this.state;
    return ( <div className='dept-container'>
       <DepartmentList departments={departments} employees={employees}/>
    </div>)
  }
}

ReactDOM.render(<Main/>, document.querySelector('#root'));

