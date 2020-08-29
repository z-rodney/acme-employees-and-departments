import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import DepartmentList from "./departmentList"

class Main extends React.Component {
	constructor() {
		super(),
			(this.state = {
				departments: [],
				employees: [],
			}),
			(this.deleteEmployee = this.deleteEmployee.bind(this))
		this.removeDepartment = this.removeDepartment.bind(this)
	}

	//[PK] -- yessss love the modularity
	async loadData() {
		const [deptRes, empRes] = await Promise.all([
			axios.get("/api/departments"),
			axios.get("/api/employees"),
		])
		const depts = deptRes.data
		const emps = empRes.data
		depts.unshift({ id: null })
		//[PK] ^-- this is a weird looking line of code -- an explanatory comment here would not be amiss! (perfectly good code tho)
		return { depts, emps }
	}

	async componentDidMount() {
		const { depts, emps } = await this.loadData()
		this.setState({
			departments: depts,
			employees: emps,
		})
	}

	async deleteEmployee(empId) {
		try {
			await axios.delete(`/api/employees/${empId}`)
			const emps = this.state.employees.filter(emp => emp.id !== empId)
			this.setState({
				employees: emps,
			})
		} catch (err) {
			console.log("unable to delete employee:", err.message)
		}
	}

	async removeDepartment(emp) {
		try {
			await axios.put(`/api/employees/${emp.id}`)
			emp.departmentId = null
			const updatedEmps = this.state.employees.map(employee => {
				return employee.id === emp.id ? emp : employee
			})
			this.setState({
				employees: updatedEmps,
			})
		} catch (err) {
			console.log("unable to change department")
		}
	}

	render() {
		const { employees, departments } = this.state
		return (
			<div className="body-container">
				<p>{employees.length} Total Employees</p>
				<div className="dept-container">
					<DepartmentList
						delete={this.deleteEmployee}
						remove={this.removeDepartment}
						departments={departments}
						employees={employees}
					/>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Main />, document.querySelector("#root"))
