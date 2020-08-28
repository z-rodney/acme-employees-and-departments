const express = require('express');
const app = express();
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
  try {
    const employees = await Employee.findAll();
    res.send(employees);
  } catch(err) {
    next(err);
  }
});

app.get('/api/departments', async (req, res, next) => {
  try {
    const departments = await Department.findAll();
    res.send(departments);
  } catch(err) {
    next(err)
  }
})

app.delete('/api/employees/:id', async (req, res, next) => {
  try {
    await Employee.destroy({ where: {
      id: req.params.id
    }});
    res.sendStatus(200)
  } catch(err) {
    next(err)
  }
})

app.put('/api/employees/:id', async (req, res, next) => {
  const emp = await Employee.findOne({where: {
    id: req.params.id
  }})
  await emp.setDepartment(null);
  res.send(emp);
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


