const express = require('express');
const app = express(); 
const morgan = require('morgan');
const {sequelize} = require('./models');

app.set('port', process.env.port || 8000);
app.use(express.urlencoded({extended: false}));

app.use(morgan('dev'));
sequelize.sync({force:false})
  .then(() => {
    console.log('db connect');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(app.get('port'), () => {
  console.log('listening port ', app.get('port'));
});