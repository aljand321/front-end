const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

//importing routes
const indexRoutes = require('./routes/index');


//setings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs','css');

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));


//MIDELWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
  });