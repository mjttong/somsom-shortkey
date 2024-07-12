const express = require('express');
const app = express(); 
const morgan = require('morgan');
const {sequelize} = require('./models');

const urlRoute = require('./routes/url');
const hardRoute = require('./routes/hard');

app.set('port', process.env.port || 8000);
app.use(express.json());

app.use(morgan('dev'));
sequelize.sync({force:false})
  .then(() => {
    console.log('db connect');
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/', urlRoute);
app.use('/', hardRoute);

app.listen(app.get('port'), () => {
  console.log('listening port ', app.get('port'));
});