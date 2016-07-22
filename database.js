var mysql = require('mysql');
var pool = mysql.createPool(require('./config'));

pool.getConnection(function (err, connection) {
    connection.query('CREATE TABLE my_user(user_id VARCHAR(128) NOT NULL, user_token VARCHAR(255), user_gcm_token VARCHAR(152), user_name VARCHAR(40), user_description VARCHAR(32), user_group Int, user_heart_num Int, user_registration_date DATETIME DEFAULT CURRENT_TIMESTAMP, user_last_visit_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(user_id));',
        function (err, result) {
            if (err) console.error('my_user 테이블 생성 에러' + err);
            connection.release();
        });
});

pool.getConnection(function (err, connection) {
    connection.query('CREATE TABLE my_group(id BIGINT NOT NULL, group_name VARCHAR(51), group_user_num Int, group_activated Int,  PRIMARY KEY(id));',
        function (err, result) {
            if (err) console.error('my_group 테이블 생성 오류' + err);
            connection.release();
        });
});

pool.getConnection(function (err, connection) {
    connection.query('CREATE TABLE heart(id SERIAL, sender_id VARCHAR(255) NOT NULL, target_id VARCHAR(255) NOT NULL, PRIMARY KEY(id));',
        function (err, result) {
            if (err) console.error('heart 테이블 생성 오류' + err);
            connection.release();
        });
});

module.exports = pool;