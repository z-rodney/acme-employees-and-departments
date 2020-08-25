const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const pg = require('pg');
const morgan = require('morgan');
const path = require('path');
const { db, Employee, Department } = require('./db');


app.use(morgan('dev'));
app.use(require('body-parser').json());
app.use('/src', express.static('./src'));
app.use('/dist', express.static('./dist'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/api/employees', async (req, res, next) => {
  const employees = await Employee.findAll();
  res.send(employees);
});

app.get('/api/departments', async (req, res, next) => {
  const departments = await Department.findAll();
  res.send(departments);
})

app.delete('/api/employees/:id', async (req, res, next) => {
  await Employee.destroy({ where: {
    id: req.params.id
  }});
  res.send('ok')
})

app.put('/api/employees/:id', async (req, res, next) => {
  const emp = await Employee.findOne({where: {
    id: req.params.id
  }})
  await emp.setDepartment(null);
  const employees = await Employee.findAll();
  res.send(employees);
})


const port = process.env.PORT || 3030;

const init = async () => {
  try {
    await db.sync();
    app.listen(port);
    console.log(`listening in on ${port}`);
  } catch(err) {
    console.log('failed to connect', err, port)
  }
}

init();


