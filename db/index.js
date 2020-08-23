const Sequelize = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/acme-emp-and-depts';
const db = new Sequelize(DATABASE_URL);
const { STRING } = Sequelize;

const Department = db.define('department', {
  name: STRING
});

const Employee = db.define('employee', {
  name: STRING
});

Department.hasMany(Employee)
Employee.belongsTo(Department)

module.exports = {
  db,
  Employee,
  Department
}


