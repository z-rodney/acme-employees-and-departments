const Sequelize = require('sequelize');
const pg = require('pg');
const dbUrl = process.env.HEROKU_POSTGRESQL_GRAY_URL|| 'postgres://localhost:5432/acme-emp-and-depts';
const db = new Sequelize(dbUrl);
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


