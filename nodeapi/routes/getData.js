var express = require('express');
var router = express.Router();
var Request = require('tedious').Request;
var sql= require('../public/javascripts/SQLConnect');

router.get('/', async (req,res) =>{
    //console.log('GetData');
    data = await sql.executeStatement(res);
    console.log(data);
    res.send(data);
})
    
module.exports = router;