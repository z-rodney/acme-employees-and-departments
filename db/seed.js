const { db, Employee, Department } = require('./index.js');
const faker = require('faker');

const employeeNames = [];
const deptNames = [];

const randomNum = () => {
  return (Math.floor(Math.random() * 5 + 1));
}

const makeAssociations = async (empArray, deptArray) => {
  for (let emp of empArray) {
    let num = randomNum();
    let currDept = deptArray.find(dept => dept.dataValues.id === num);
    await emp.setDepartment(currDept);
  }
}

for (let i = 0; i < 5; i++) {
  deptNames.push({name: faker.commerce.department()});
}

for (let i = 0; i < 50; i++) {
  employeeNames.push({name: faker.name.firstName()})
}

const seed = async () => {
  try {
    await db.sync({force: true});
    await Promise.all([
      Employee.bulkCreate(employeeNames),
      Department.bulkCreate(deptNames)
    ]);
    const [ emps, depts ] = await Promise.all([
      Employee.findAll(),
      Department.findAll()
    ])
    console.log(depts)
    await makeAssociations(emps, depts);
    await db.close();
  } catch(err) {
    console.log('failed to seed', err)
  }
}

seed();


