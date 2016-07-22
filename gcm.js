var gcm = require('node-gcm');
var fs = require('fs');

var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        title: 'saltfactory GCM demo',
        message: 'Google Cloud Messaging 테스트'
    }
});

var server_api_key = 'AIzaSyBf1lQh3B64zd7vgXroHxL0I6Ks9mGW8QQ';
var sender = new gcm.Sender(server_api_key);

// var token = 'd83WgLh1vhk:APA91bFWZPFkZAj8tL3ALhy3T8xZEt-IxvfyDgXc1-99k7eCcnj-rHR0RCATQGAw93_fWOOmLHO_FqtVgcXcVcYw3nCdkEgQ5TKhnEGy8zh0xS8sjRcyiPuX2DtzmK0f9b9fzQ7_V7TC';

module.exports.sendPush = function (token, message) {
    var registrationIds = [];
    registrationIds.push(token);

    msg = new gcm.Message({
        collapseKey: 'myheart',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            title: 'MyHeart',
            message: message
        }
    });

    sender.send(msg, registrationIds, 4, function (err, result) {
        console.log(result);
    });
}