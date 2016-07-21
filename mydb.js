var mysql = require('mysql');
var pool = require('./database');

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

module.exports.newUser = function (token, user_name, user_description, user_group, callback) {
    pool.getConnection(function (err, connection) {
        var user = {
            'user_social_token': token,
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
            'SELECT * FROM my_user WHERE user_social_token=?',
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

module.exports.getGroupUsers = function (group_id, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(
            'SELECT user_name, user_social_token, user_heart_num FROM my_user WHERE user_group=?',
            [group_id],
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
    // pg.connect(dbUrl, function (err, client, done) {
    //     client.query(
    //         'UPDATE my_user SET user_name=$1 WHERE user_social_token=$2',
    //         [new_name, token],
    //         function (err, result) {
    //             callback(err);
    //         }
    //     );
    // });
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
                        'UPDATE my_user SET user_heart_num=(user_heart_num+1) WHERE user_social_token=?',
                        [target_id],
                        function (err, result) {
                            if (err) {
                                callback(err);
                            }
                            else {
                                callback(err, heart);
                            }
                        });

                }
                connection.release();
            });
    });
}