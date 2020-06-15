'use strict';

var mongoose = require('mongoose'),
Book = mongoose.model('book');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

///var hbs = require('nodemailer-express-handlebars');


//Step 1
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'sargisovsepyan@gmail.com',
    pass: 'sargis1020304050'
  },
  tls: { rejectUnauthorized: false }
}))



exports.list_all_books = function(req, res) {
  Book.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};



exports.create_a_book = function(req, res) {
  console.log("create_a_book");
  var new_book = new Task(req.body);
  new_book.save(function(err, task) {
    if (err) 
      res.send(err);
      res.json(task);
 
      
 ///
      //var options = {
       // viewEngine : {
        //    extname: '.handlebars', // handlebars extension
         //   layoutsDir: './views/', // location of handlebars templates
           // defaultLayout: 'index', // name of main template
            //partialsDir: './views/', // location of your subtemplates aka. header, footer etc
        //},
       // viewPath: './views/',
        //extName: '.handlebars'
        //};    
        //transporter.use('compile', hbs(options));
///

  //Step 2    
var mailOptions = {
  from: 'sargisovsepyan@gmail.com',
  to: 'sargisovsepyan@gmail.com',
  subject: 'New book salons',
  
  //text: "s",
  html: "<div style='margin:0px;padding:10px;background-color:#FEFEFA;border:2px solid #000000'><img src='cid:5.jpg' width='100%'><h3>Имя: "+task.name+"</h3> <h3>Телефон: " + task.phone + "</h3>  <h3>Услуга: " + task.service + "</h3> <h3>Дата: " + task.dateOfService + "</h3> <h3>Время: "+task.time+"</h3> <h3>Приметка: " + task.note +"</h3></div>",
  //template : "index"//

  //////
};

//Step 3
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("sargis"+error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  });
};

// exports.read_a_book = function(req, res) {
//   Task.findById(req.params.bookId, function(err, book) {
//     if (err)
//       res.send(err);
//     res.json(book);
//   });
// };
exports.update_a_book = function(req, res) {
  Book.findOneAndUpdate({_id:req.params.bookId}, req.body, {booked: true}, function(err, book) {
    if (err)
    res.send(err);
    res.json(book);
    var mailOptions = {
      from: 'sargisovsepyan@gmail.com',
      to: 'sargisovsepyan@gmail.com',
      subject: 'New book salons',
      html: "<div style='margin:0px;padding:10px;background-color:#FEFEFA;border:2px solid #000000'><img src='cid:5.jpg' width='100%'><h3>Имя: "+req.body.name+"</h3> <h3>Телефон: " + req.body.phone + "</h3>  <h3>Услуга: " + req.body.service + "</h3> <h3>Дата: " + req.body.dateOfService + "</h3> <h3>Время: "+req.body.time+"</h3> <h3>Приметка: " + req.body.note +"</h3></div>",
    };
    
    //Step 3
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("sargis"+error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  });
 
};

exports.read_a_book = function(req, res) {
  console.log(req.params.dateOFC.replace(/ /g,''));
  Book.find({ dateOfService: req.params.dateOFC.replace(/ /g,''), booked: false }, function(err, result) {
    if (err)
      res.send(err);
      res.json(result);
  });
};

// exports.update_a_book = function(req, res) {
//   Task.findOneAndUpdate({_id:req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
// Task.remove({}).exec(function(){});

exports.delete_a_task = function(req, res) {

  Task.remove({
    _id: req.params.bookId
  }, function(err, book) {
    if (err)
      res.send(err);
    res.json({ message: 'Book successfully deleted' });
  });
};