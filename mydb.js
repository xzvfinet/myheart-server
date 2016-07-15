var pg = require('pg');
var path = require('path');

var dbUrl = require(path.join(__dirname, 'config.js'));

module.exports.insertNewUser = function (token, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'SELECT * FROM my_user WHERE user_social_token = $1;',
            [token],
            function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.rowCount == 0) {
                        // 새로운 유저
                        client.query(
                            'INSERT into my_user (user_name, user_social_token, user_group, user_heart_num, user_registration_date, user_last_visit_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
                            ['', token, '', 0, new Date(), new Date()],
                            function (err, result) {
                                if (err) {
                                    console.log(err);
                                    callback(false, err);
                                } else {
                                    console.log('유저 insert 성공 id: ' + result.rows[result.rowCount - 1].id);
                                    callback(true, null);
                                }
                                client.end();
                            });
                    }
                    else {
                        // 기존 유저
                        console.log("기존 유저: " + token);
                        callback(false, "user " + token + " exist")
                    }

                }
            }

        );
    });
};

module.exports.isExistGroup = function (group_id, callback) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'SELECT * FROM my_group WHERE id = $1;',
            [group_id],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (result.rowCount == 1) {
                        console.log('그룹 SELECT 성공 id: ' + result.rows[0].id);
                        callback(result.rows[0]);
                    }
                    else {
                        console.log('그룹 SELECT 에러, ' + result.rows.length + ' 개 존재');
                        callback(null);

                    }
                }

                client.end();
            }
        )
    });
}

module.exports.newGroup = function (group_id, group_name) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'INSERT into my_user (user_name, user_social_token, user_group, user_heart_num, user_registration_date, user_last_visit_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
        );

    });
}

module.exports.getGroupName = function (group_id) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            'SELECT group_name FROM my_group WHERE id = &1;',
            [group_id],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (result.rowCount == 1) {

                    }
                }
                client.end();
                // return result.rows[0].group_name;
            }
        )
    });
}

module.exports.updateUser = function (token, user_info) {
    pg.connect(dbUrl, function (err, client, done) {
        client.query(
            ''
        );
    });
}
