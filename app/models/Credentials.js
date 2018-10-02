var mongoose = require('mongoose');
let bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://tester:naeim410@cluster0-zz5rm.mongodb.net/users', { useNewUrlParser: true });

// schema 
var credentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// static methods 
credentialsSchema.statics.create_credentials = function (email, password, callback) {
    bcrypt.hash(password, 10, function (err, hash) {
        Credentials.create({email: email, password: hash}).then(callback);
    });
    console.log('how about now?');
};

credentialsSchema.statics.delete_credentials = function(email, callback) {
    Credentials.deleteOne({email: email}).then(callback);
};

// instance methods 

// model
var Credentials = mongoose.model('Credentials', credentialsSchema, 'credentials');

module.exports = Credentials;