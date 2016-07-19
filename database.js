// database
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, 'config.js'));

var client = new pg.Client(connectionString);
client.connect();

// user table
var query = client.query(
    'CREATE TABLE my_user(id SERIAL, user_social_token VARCHAR(255) PRIMARY KEY, user_name VARCHAR(40), user_group Int, user_heart_num Int, user_registration_date timestamp, user_last_visit_date timestamp)');
query.on('end', function() { console.log("my_user 테이블 생성 성공") });

// group table
query = client.query(
    'CREATE TABLE my_group(id int PRIMARY KEY, group_name VARCHAR(51), group_user_num Int, group_activated Boolean)');
query.on('end', function() {console.log("my_group 테이블 생성 성공")});

// friend table
query = client.query(
    'CREATE TABLE friend(user_id1 Int, user_id2 Int)');
query.on('end', function() {console.log("friend 테이블 생성 성공")});

// heart table
query = client.query(
    'CREATE TABLE heart(id SERIAL, sender_id Int NOT NULL, target_id Int NOT NULL)');
query.on('end', function() {console.log("heart 테이블 생성 성공")});

// friend_request table
query = client.query(
    'CREATE TABLE friend_request(requester_id Int NOT NULL, target_id Int NOT NULL)');
query.on('end', function() {console.log("friend_request 테이블 생성 성공")});

// query = client.query('');
// query.on('end', function() {client.end();});
