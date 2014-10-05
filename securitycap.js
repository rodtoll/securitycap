var exec = require('child_process').exec;

var SecurityCap = function() {
}

SecurityCap.prototype.capPicture = function(cameraid, filename, completion) {
    exec(['./capSecurityPic ',cameraid], function (error, stdout, stderr) {
	if(error != null) {
	    completion(false, error, '');
        } else {
	    completion(true, null, filename);
	}
    });
}

exports.SecurityCap = SecurityCap;

