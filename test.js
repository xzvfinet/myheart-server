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
    connection.query('CREATE TABLE my_user(id SERIAL, user_social_token VARCHAR(255) PRIMARY KEY, user_name VARCHAR(40), user_group Int, user_heart_num Int, user_registration_date timestamp, user_last_visit_date timestamp);',
    function(err, result) {
        if (err) console.error('에러임니당' + err);
        console.log("rows : " + JSON.stringify(result));

        connection.release();
    });
})

// connection.connect(function (err) {
//     if (err) {
//         console.error('mysql connection error');
//         console.error(err);
//         throw err;
//     }
//     else {
//         var query = connection.query(,
//             function (err, result) {
//                 if (err) {
                    
                    
//                     console.error(err);
//                     // throw err;
//                     // res.send(500, 'failed');
//                     return;
//                 }
//                 console.log(result);
//                 // res.send(200, 'success');

//             });
//     }
// });

// var dbUrl = require(path.join(__dirname, 'config.js'));

// pg.connect(dbUrl, function (err, client, done) {
//     var i = 0, count = 0;
//     client.query(
//         'SELECT * FROM my_user WHERE user_social_token=$1;',
//         ['EAAYtYSv42poBANIrVFweD9srKouaumCN0v7Q6e4mCr2gUaC79K9F36Cn8c35n4LBWjkeLqoEEVmphwhwdPoMsa1SM82Yu3YSwaSHXivQogCwCQp3avb8eqHQhglNSeg5aOZCvBo1stKgSshqQlRfFOE69tM87Hz7jZCC10zFmEAlnI8CHI37VU5tT7u19v5sFCztbeywZDZD'],
//         function (err, result) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(result.rows[0]);
//                 console.log('row inserted with id: ');
//             }

//             client.end();
//         });
// });