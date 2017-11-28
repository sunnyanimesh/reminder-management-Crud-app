var users = require('mongoose').model('users');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.allUsers = function(req,res){
  users.find(function(err,user){
    if(err){
      sendJSONresponse(res,400,err);
    }else{
      if(user.length == 0)
      sendJSONresponse(res,404,{message : "Empty"});
      else
      sendJSONresponse(res,200,user);
    }

      });

};
module.exports.user = function(req,res){
  if(!req.query.username || req.query.username == "")
  sendJSONresponse(res,404,{message : "No username"});
  else
users.findOne({username : req.query.username}, function(err,user){
  if(err)
    sendJSONresponse(res,400,err);
  else {
    if(user ==  null){
    sendJSONresponse(res,404,{message : "User Not Found"});
    console.log("here");
   }
    else {
      sendJSONresponse(res,200,user);
    }
  }

});
};
module.exports.newUser = function(req,res){
  var new_users = new users(req.body);
  new_users.save(function(err,user){
    if(err){
      sendJSONresponse(res,400,err);
    }else{
      sendJSONresponse(res,201,{message : "Successfully added"});
    }
  });

};
