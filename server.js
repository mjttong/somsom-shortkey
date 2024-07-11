const express = require('express');
const app = express();

app.set('port', process.env.port || 8000);
app.use(express.urlencoded({extended: false}));



app.listen(app.get('port'), () => {
  console.log('listening port ', app.get('port'));
});