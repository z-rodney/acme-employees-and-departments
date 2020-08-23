const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const pg = require('pg');
const morgan = require('morgan');
const path = require('path');


app.use(morgan('dev'));
app.use(require('body-parser').json());
app.use('/src', express.static('./src'));
app.use('/dist', express.static('./dist'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})


PORT = process.env.PORT || 3030;

const init = () => {
  app.listen(PORT);
  console.log(`listening in on ${PORT}`);
}

init();


