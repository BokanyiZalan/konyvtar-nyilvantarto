require('dotenv').config({url: __dirname+'/../.env'})
var mysql =require('mysql')
var pool = mysql.createPool({
  connectionLimit:      process.env.DB_CONN_LIMIT,
 
  host:                 process.env.DB_HOST,
  user:                 process.env.DB_USER,
  password:             process.env.DB_PASS,
  port:                 process.env.DB_PORT,
  database:             process.env.DB_NAME
 


})

module.exports=pool