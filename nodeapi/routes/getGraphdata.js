var express = require('express');
var router = express.Router();
var Request = require('tedious').Request;
var sql= require('../public/javascripts/SQLConnect');

router.get('/', async (req,res) =>{
    //console.log('GetGraphData');
    data =  await sql.executeStatement2(res,req.query.serverName,req.query.comp_date);
    console.log(data);
    res.send(data);
})

module.exports = router;