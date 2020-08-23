const { db, Employee, Department } = require('./index.js');
const faker = require('faker');

const employeeNames = [];
const deptNames = [];

for (let i = 0; i < 50; i++) {
  employeeNames.push({name: faker.name.firstName()})
}

for (let i = 0; i < 5; i++) {
  deptNames.push({name: faker.commerce.department()});
}

const seed = async () => {
  await db.sync({force: true});
  await Promise.all([
    Employee.bulkCreate(employeeNames),
    Department.bulkCreate(deptNames)
  ]);
  await db.close();
}

seed();


