var mysql = require('mysql');
var pool = mysql.createPool(require('./config'));

pool.getConnection(function(err, connection) {
    connection.query('CREATE TABLE my_user(user_social_token VARCHAR(255) NOT NULL, user_name VARCHAR(40), user_description VARCHAR(50), user_group Int, user_heart_num Int, user_registration_date DATETIME DEFAULT CURRENT_TIMESTAMP, user_last_visit_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(user_social_token));',
    function(err, result) {
        if (err) console.error('my_user 테이블 생성 에러' + err);
        connection.release();
    });
});

pool.getConnection(function(err, connection) {
    connection.query('CREATE TABLE my_group(id INT NOT NULL, group_name VARCHAR(51), group_user_num Int, group_activated Int,  PRIMARY KEY(id));',
    function(err, result) {
        if (err) console.error('my_group 테이블 생성 오류' + err);
        connection.release();
    });
});

pool.getConnection(function(err, connection) {
    connection.query('CREATE TABLE heart(id SERIAL, sender_id VARCHAR(255) NOT NULL, target_id VARCHAR(255) NOT NULL, PRIMARY KEY(id));',
    function(err, result) {
        if (err) console.error('heart 테이블 생성 오류' + err);
        connection.release();
    });
});

module.exports = pool;

// // database
// var pg = require('pg');
// var path = require('path');
// var connectionString = require(path.join(__dirname, 'config.js'));

// var client = new pg.Client(connectionString);
// client.connect();

// // user table
// var query = client.query(
//     'CREATE TABLE my_user(id SERIAL, user_social_token VARCHAR(255) PRIMARY KEY, user_name VARCHAR(40), user_group Int, user_heart_num Int, user_registration_date timestamp, user_last_visit_date timestamp)');
// query.on('end', function() { console.log("my_user 테이블 생성 성공") });

// // group table
// query = client.query(
//     'CREATE TABLE my_group(id int PRIMARY KEY, group_name VARCHAR(51), group_user_num Int, group_activated Boolean)');
// query.on('end', function() {console.log("my_group 테이블 생성 성공")});

// // friend table
// query = client.query(
//     'CREATE TABLE friend(user_id1 Int, user_id2 Int)');
// query.on('end', function() {console.log("friend 테이블 생성 성공")});

// // heart table
// query = client.query(
//     'CREATE TABLE heart(id SERIAL, sender_id Int NOT NULL, target_id Int NOT NULL)');
// query.on('end', function() {console.log("heart 테이블 생성 성공")});

// // friend_request table
// query = client.query(
//     'CREATE TABLE friend_request(requester_id Int NOT NULL, target_id Int NOT NULL)');
// query.on('end', function() {console.log("friend_request 테이블 생성 성공")});

// // query = client.query('');
// // query.on('end', function() {client.end();});
