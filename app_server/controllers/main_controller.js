var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
module.exports.index= function(req, res) {
if(!req.session.user)
  res.render('index', { title: 'Reminder Management' ,message : ""});
else {
  res.redirect('/dashboard');
}
};
module.exports.validateuser = function(req,res,next){
  if(!req.session.user)
  res.redirect('/');
  else {
    next();
  }
};

module.exports.login = function(req,res){
  var user = req.query.username;
var pass = req.query.password;
var requestOptions,path;
path = '/api/user';
requestOptions = {
  url  : apiOptions.server + path,
  method : "GET",
  json : {},
  qs : {
    username : user
  }
};
request(requestOptions, function(err,response,user){
  if(err)
      res.redirect('/');
    else if(user.message)
      res.render('index',{title : 'express' , message : user.message});
    else{


          if(user.password == pass)
          {
            req.session.user = user;
            res.redirect('/dashboard');
          }else {
            res.render('index',{title : 'express' , message : "Wrong Password"});
          }


    }

});

}

module.exports.dashboard= function(req,res){
  res.render('dashboard',req.session.user);

}
module.exports.logout = function(req,res){
  req.session.destroy();
  res.redirect('/');
};
