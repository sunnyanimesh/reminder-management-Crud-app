var reminders = require('mongoose').model('reminders');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.allReminders = function(req,res){
  reminders.find().populate('user').exec(function(err,reminder){
    if(err){
      sendJSONresponse(res,400,err);
    }else{
      if(reminder.length == 0)
      sendJSONresponse(res,404,{message : "Empty"});
      else
      sendJSONresponse(res,200,reminder);
    }

      });

};
module.exports.addReminder = function(req,res){
  var new_reminder = new reminders(req.body);
  new_reminder.save(function(err,reminder){
    if(err){
      sendJSONresponse(res,400,err);
    }else{
      sendJSONresponse(res,201,{message : "Successfully added"});
    }
  });

};
module.exports.updateReminder = function(req,res){
  reminders.findById(req.params.id,function(err,reminder){
          if(err)
            sendJSONresponse(res,400,err);
          else {
            if(reminder ==  null){
            sendJSONresponse(res,200,{message : "Not Found"});
           }
            else {
               if(req.body.subject && req.body.subject != '')
                reminder.subject = req.body.subject;
                if(req.body.description && req.body.description != '')
                reminder.description = req.body.description;
                if(req.body.email && req.body.email != '')
                reminder.email = req.body.email;
                if(req.body.mobile && req.body.mobile != '')
                reminder.mobile = req.body.mobile;
                if(req.body.recur && req.body.recur != '')
                      reminder.recur = req.body.recur;
                if(req.body.status && req.body.status != '')
                      reminder.status = req.body.status;

                reminder.save(function(err,reminder){
                  if(err){
                    sendJSONresponse(res,400,err);
                  }else{
                    sendJSONresponse(res,201,{message : "Successfully updated"});
                  }
                });
            }
          }
      });
};
module.exports.deleteReminder= function(req,res){
  reminders.findById(req.params.id, function(err,reminder){
    if(err)
      sendJSONresponse(res,400,err);
    else {
      reminder.remove(function(err,rem){
        if(err){
          sendJSONresponse(res,400,err);
        }else{
          sendJSONresponse(res,201,{message : "Successfully deleted"});
        }
      });
    }
  });
};
module.exports.remindersByUser = function(req,res){
  reminders.find({user : req.params.id}).populate('user').exec(function(err,reminder){
    if(err){
      sendJSONresponse(res,400,err);
    }else{
      if(reminder.length == 0)
      sendJSONresponse(res,404,{message : "No issues"});
      else
      sendJSONresponse(res,200,reminder);
    }

  });
};
module.exports.reminderById = function(req,res){
  reminders.findById(req.params.id, function(err,reminder){
    if(err)
      sendJSONresponse(res,400,err);
    else {
      if(reminder ==  null){
      sendJSONresponse(res,200,{message : "Not Found"});
     }
     else{
       sendJSONresponse(res,200,reminder);

     }
  }
});
};
