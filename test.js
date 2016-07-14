var pg = require('pg');
var path = require('path');

var dbUrl = require(path.join(__dirname, 'config.js'));

pg.connect(dbUrl, function (err, client, done) {
    var i = 0, count = 0;
    client.query(
        'INSERT into my_user (user_name, user_social_token, user_group, user_heart_num, user_registration_date, user_last_visit_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
        ['Hajin', 'token', 'group', 0, new Date(), new Date()],
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('row inserted with id: ' + result.rows[0].id);
            }

            client.end();
        });
});