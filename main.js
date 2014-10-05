var mailer = require('./mailer.js');
var securitycap = require('./securitycap.js');
var restify = require('restify');

function captureAndSendPic(req, res, next) {
    var mailClient = new mailer.Mailer('useremail', 'apppassword');
    var capClient = new securitycap.SecurityCap();

    capClient.capPicture(0, './ssss.jpeg', function(success, error, filename) {
	if(success == true) {
	    mailClient.sendEmail(
		'address',
		'Doorbell Rang',
		'Doorbell was rung. Below is screen capture from front camera',
		filename,
		function(error, info) {
		    if(error != null) {
			console.log('Email failed. Error: '+info);
		    } else {
			console.log('Email sent');
		    }
		});    
	} else {
	    console.log('Failed to capture. Error: '+error);
	}
    });
    res.send('In progress - camera: '+req.params.id);
    next();
}

var server = restify.createServer();
server.get('/cap/:id', captureAndSendPic);

server.listen(8040, function() {
  console.log('%s listening at %s', server.name, server.url);
});


