var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');

// APP IS RUNNING AT PORT 5000
var app = express();


// MONGO CONNECTION
var connectionString = "mongodb+srv://dbuser:Password1!@cluster0.b5i8c.mongodb.net/bigbyte";
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(){
    console.log("database is connected");
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);

module.exports = app;
