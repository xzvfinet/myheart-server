var pg = require('pg');
var path = require('path');

var dbUrl = require(path.join(__dirname, 'config.js'));

pg.connect(dbUrl, function (err, client, done) {
    var i = 0, count = 0;
    client.query(
        'SELECT * FROM my_user WHERE user_social_token=$1;',
        ['EAAYtYSv42poBANIrVFweD9srKouaumCN0v7Q6e4mCr2gUaC79K9F36Cn8c35n4LBWjkeLqoEEVmphwhwdPoMsa1SM82Yu3YSwaSHXivQogCwCQp3avb8eqHQhglNSeg5aOZCvBo1stKgSshqQlRfFOE69tM87Hz7jZCC10zFmEAlnI8CHI37VU5tT7u19v5sFCztbeywZDZD'],
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result.rows[0]);
                console.log('row inserted with id: ');
            }

            client.end();
        });
});