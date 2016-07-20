var pg = require('pg');
var path = require('path');

var dbUrl = require(path.join(__dirname, 'config.js'));

module.exports.newUser = function (token, user_name, user_group, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'INSERT into my_user (user_name, user_social_token, user_group, user_heart_num, user_registration_date, user_last_visit_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            [user_name, token, user_group, 0, new Date(), new Date()],
            function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    console.log('유저 insert 성공 id: ' + result.rows[0]);
                    callback(err, result.rows[0]);
                }
                client.end();
            });
    });
};

module.exports.getUser = function (token, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'SELECT * FROM my_user WHERE user_social_token=$1;',
            [token],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('GET user ' + result.rows[0]);
                }
                callback(err, result.rows[0]);
                client.end();
            }
        );
    });
};

module.exports.getGroupUsers = function (group_id, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'SELECT user_name, user_social_token, user_heart_num FROM my_user WHERE user_group=$1;',
            [group_id],
            function (err, result) {
                if (err) {
                    console.log(err);
                }
                callback(err, result.rows);
                client.end();
            }
        );
    })
}

module.exports.updateUserName = function (token, new_name, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'UPDATE my_user SET user_name=$1 WHERE user_social_token=$2',
            [new_name, token],
            function (err, result) {
                callback(err);
            }
        );
    });
}

module.exports.newGroup = function (group_id, group_name, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'INSERT into my_group(id, group_name, group_user_num, group_activated) VALUES($1, $2, $3, $4) RETURNING id',
            [group_id, group_name, 0, 'true'],
            function (err, result) {
                if (err) {
                    // console.log(err);
                    callback(err, null);
                } else {
                    console.log('그룹 insert 성공 id: ' + result.rows[result.rowCount - 1].id);
                    callback(err, result.rows[0]);
                }
                client.end();
            }
        );

    });
}

module.exports.getGroup = function (group_id, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'SELECT * FROM my_group WHERE id=$1',
            [group_id],
            function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log('GET group ' + result.rows[0]);
                    callback(err, result.rows[0]);
                }
                client.end();
            }
        )
    });
}

module.exports.newHeart = function (sender_id, target_id, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'INSERT into heart (sender_id, target_id) VALUES($1, $2) RETURNING id',
            [sender_id, target_id],
            function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    client.query(
                        'UPDATE my_user SET user_heart_num=(user_heart_num+1) WHERE user_social_token=$1',
                        [target_id],
                        function (err, result) {
                            callback(err);
                            client.end();
                        }
                    );
                }
            }
        )
    });
}