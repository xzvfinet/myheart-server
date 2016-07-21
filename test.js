var mysql = require('mysql');

var path = require('path');

var pool = mysql.createPool({
    connectionLimit: 3,
    host: '211.249.63.188',
    port: 3306,
    user: 'root',
    password: '2H38hoEtQ!',
    database: 'test'
});

pool.getConnection(function(err, connection) {
    connection.query('CREATE TABLE my_user(id SERIAL, user_token VARCHAR(255) PRIMARY KEY, user_name VARCHAR(40), user_group Int, user_heart_num Int, user_registration_date timestamp, user_last_visit_date timestamp);',
    function(err, result) {
        if (err) console.error('에러임니당' + err);
        console.log("rows : " + JSON.stringify(result));

        connection.release();
    });
})