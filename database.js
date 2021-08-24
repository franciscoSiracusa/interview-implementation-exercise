const mysql = require('mysql');
const {promisify} = require('util'); // mysql uses callbacks

let database = {
    host: 'localhost', //local storage
    user: 'root', //defaul user of mysql
    password: '', //has no password
    database: 'database_todolist' //database of the to-do app
}

const pool = mysql.createPool(database); //connection to the database_todolist

pool.getConnection((err,connection) =>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSE');
        }
    }
    if (connection) 
        connection.release();
    console.log('DB is connected');
    return;
});

//with promisify every time i make a query i can use promises and async await
pool.query = promisify(pool.query);

module.exports = pool;