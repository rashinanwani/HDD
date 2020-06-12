var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getDataRouter = require('./routes/getData')
var getTableRouter = require('./routes/getTable')
var getGraphRouter = require('./routes/getGraphdata')

var conn_status = [];

//sql connection
var sql= require('./public/javascripts/SQLConnect');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view cache', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


var corsOption = 
{
  origin : "*",
  optionsSuccessStatus : 200 
};
app.use(cors(corsOption));

sql.connect();

app.use('/getdata',async function(req,res,next) { 
data = []  
console.log('data')
data[0] = await sql.executeStatement2(res,req.query.serverName,req.query.comp_date);
data[1] = await sql.executeStatement(res);
data[2] = await sql.executeStatement3(res,req.query.serverName);
data[3] = await sql.executeStatement4(res,req.query.serverName); 
data[4] = await sql.executeStatement5(res,req.query.serverName);
data[5] = await sql.executeStatement6(res,req.query.serverName);
data[6] = await sql.executeStatement7(res,req.query.serverName,req.query.curr_date);
data[7] = await sql.executeStatement8(res);
data[8] = await sql.executeStatement9(res,req.query.serverName,req.query.curr_date);
res.send(data);
});

app.use('/gettable',getTableRouter)

//catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


module.exports = app;