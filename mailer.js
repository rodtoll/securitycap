var nodemailer = require('nodemailer');

var Mailer = function(username, password) {
    this.username = username;
    this.password = password;
    this.transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
	    user: username,
	    pass: password
	    }
	});
}

Mailer.prototype.sendEmail = function(to, subject, contents, attachment, completion) {
    var mailOptions = {
	from: this.username,
	to: to,
	subject: subject,
	text: contents,
	attachments: [{filename: attachment, path: attachment}]
    };
    this.transporter.sendMail(mailOptions, completion);
}

exports.Mailer = Mailer;
