DataReader = {
    read: function(filepath) {
        var q = require('q'),
            fs = require('fs');

        var deferred = q.defer();

        fs.readFile(filepath, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }
};

exports.read = DataReader.read;
