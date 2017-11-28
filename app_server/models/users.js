var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
name : {
  type : String,
  required : true
},
password : {
  type : String,
  required : true
},
username : {
  type : String,
  required : true
},
mobile : {
  type: Number,
  required : true
}

});

mongoose.model('users',userSchema);
