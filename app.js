var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv);
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let schoolResponse;
let lessonResponse;
 
app.use('/home', express.static('client/home'));
app.use('/school', express.static('client/school'));
app.use('/teacherLesson', express.static('client/teacherLesson'));
app.use('/studentLesson', express.static('client/studentLesson'));
app.use('/images', express.static('client/assets/images'));
app.use('/literallycanvas', express.static('client/literallycanvas'));

app.use(express.static('client/home'));

app.post('/createSchool', function(req, res) {
	schoolResponse = {
		school_name: req.body.schoolName,
		school_private: req.body.schoolPrivate,
		entry_password: req.body.entryPassword
	};
	console.log(schoolResponse);
  
  res.sendFile(path.join(__dirname, '/client/school/index.html'));
});

app.post('/teacherLesson', function(req, res) {
	lessonResponse = {
    user_name: req.body.userName,
		lesson_name: req.body.lessonName,
		lesson_desc: req.body.lessonDesc,
		lesson_sub: req.body.lessonSubject,
    lesson_private: req.body.lessonPrivate,
    lesson_password: req.body.entryPassword,
    lesson_teacher: req.body.lessonTeacher
	};
	console.log(lessonResponse);
  
  res.sendFile(path.join(__dirname, '/client/teacherLesson/index.html'));
});

app.post('/studentLesson', function(req, res) {
	lessonResponse = {
    user_name: req.body.userName,
		lesson_name: req.body.lessonName,
		lesson_desc: req.body.lessonDesc,
		lesson_sub: req.body.lessonSubject,
    lesson_private: req.body.lessonPrivate,
    lesson_password: req.body.entryPassword,
    lesson_teacher: req.body.lessonTeacher
	};
	console.log(lessonResponse);
  
  res.sendFile(path.join(__dirname, '/client/studentLesson/index.html'));
});

io.on('connection', (socket) => {
  console.log('connection! hallelujah this is taking forever');
  socket.on('schoolPageReady', function() {
    socket.emit('schoolPageInfo', schoolResponse);
    console.log('school page ready recieved');
  });
  socket.on('lessonPageReady', function() {
    socket.emit('lessonPageInfo', lessonResponse);
    console.log('lesson page ready recieved');
  });
  socket.on('updateLessonCanvas', function(lessonCanvasState) {
    io.emit('lessonCanvasUpdate', lessonCanvasState);
    console.log('lesson canvas update recieved');
    console.log(lessonCanvasState);
  });
  
  socket.on('chat message', function(msg, user){
    io.emit('chat message', msg, user);
  });
});

serv.listen(3000);
console.log("Server started on localhost://3000");