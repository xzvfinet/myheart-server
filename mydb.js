var mysql = require('mysql');
var pool = require('./database');
var gcm = require('./gcm.js');

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

module.exports.newUser = function (user_id, user_token, user_gcm_token, user_name, user_description, user_group, callback) {
    pool.getConnection(function (err, connection) {
        var user = {
            'user_id': user_id,
            'user_token': user_token,
            'user_gcm_token': user_gcm_token,
            'user_name': user_name,
            'user_description': user_description,
            'user_group': user_group,
            'user_heart_num': 0,
            "user_last_visit_date": new Date().toMysqlFormat()
        };
        connection.query('INSERT INTO my_user SET ?', user,
            function (err, result) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(err, user);
                }
                connection.release();
            });
    });
};

module.exports.getUser = function (token, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM my_user WHERE user_id=?',
            [token],
            function (err, rows) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(err, rows[0]);
                }
                connection.release();
            });
    });
};

module.exports.getGroupUsers = function (group_id, except_id, callback) {
    pool.getConnection(function (err, connection) {
        console.log('except: ' + except_id);
        connection.query(
            'SELECT user_id, user_name, user_description, user_heart_num FROM my_user WHERE user_group=? AND NOT user_id=?',
            [group_id, except_id],
            function (err, rows) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(err, rows);
                }
                connection.release();
            });
    });
}

module.exports.updateUserName = function (token, new_name, callback) {

}

module.exports.newGroup = function (group_id, group_name, callback) {
    pool.getConnection(function (err, connection) {
        var group = {
            'id': group_id,
            'group_name': group_name,
            'group_user_num': 0,
            'group_activated': 1
        };
        connection.query(
            'INSERT into my_group SET ? ', group,
            function (err, result) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(err, group);
                }
                connection.release();
            });
    });
}

module.exports.getGroup = function (group_id, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM my_group WHERE id=?',
            [group_id],
            function (err, rows) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(err, rows[0]);
                }
                connection.release();
            });
    });
}

function sendPushTo(target_id) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT user_gcm_token FROM my_user WHERE user_id=?',
            [target_id],
            function (err, rows) {
                if (err) {
                    console.log("push 보내기 에러: " + err);
                }
                else {
                    gcm.sendPush(rows[0]["user_gcm_token"], "누군가가 하트를 보냈습니다!");
                    gcm.sendPush(rows[0]["user_gcm_token"], "누군가가 하트를 보냈습니다!");
                }
                connection.release();
            });
    });
}

module.exports.newHeart = function (sender_id, target_id, callback) {
    pool.getConnection(function (err, connection) {
        var heart = {
            'sender_id': sender_id,
            'target_id': target_id
        };
        connection.query(
            'INSERT INTO heart SET ?',
            heart,
            function (err, result) {
                if (err) {
                    callback(err);
                }
                else {
                    connection.query(
                        'UPDATE my_user SET user_heart_num=(user_heart_num+1) WHERE user_id=?',
                        [target_id],
                        function (err, result) {
                            if (err) {
                                callback(err);
                            }
                            else {
                                callback(err, heart);
                                sendPushTo(target_id);
                            }
                        });

                }
                connection.release();
            });
    });
}