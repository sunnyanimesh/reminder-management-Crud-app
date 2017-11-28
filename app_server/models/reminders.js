var mongoose = require('mongoose');
var reminderSchema = new mongoose.Schema({
  date : {
    type : Date,
    default : Date.now
  },
  subject : {
    type : String,
    enum : ['Math','Science','SST','English','Computer']
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users'
  },
  description : {
    type : String,
  },
  email : {
    type : String,
  },
  mobile : {
    type : Number,
  },
  recur : {
    type  : Number,
    enum : [7,5,3,2],
    default : 2
  },
  status : {
    type : String,
    enum : ['Active','Disable'],
    default : 'Active'
  }
});
mongoose.model('reminders',reminderSchema);
