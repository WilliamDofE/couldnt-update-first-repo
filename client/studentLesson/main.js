//variables
var userName = "";

//client
function showSignIn() {
  var signInContainer = document.getElementById("SignInContainer");
  if(signInContainer.style.display == "none")
    SignInContainer.style.display = "block";
  else
    SignInContainer.style.display = "none";
}

//canvas stuff
let lessonCanvas = LC.init(
  document.getElementById('lessonCanvas'),
  {imageURLPrefix: '/literallycanvas/img'}
);

//socket
let socket = io();

//get data from school page
socket.on('lessonPageInfo', function(lessonResponse) {
  console.log('lesson page info received');
  console.log(lessonResponse);
  console.log(lessonResponse.user_name);
  userName = lessonResponse.user_name;
});

socket.on('lessonCanvasUpdate', function(lessonCanvasState) {
  console.log('lesson canvas update');
  console.log(lessonCanvasState);
  lessonCanvas.loadSnapshot(lessonCanvasState);
});

window.onload = function() {
  socket.emit('lessonPageReady');
  console.log("lesson page ready");
};

//chat
var userTypingMessage = false;
var isUserTyping = false;

var userTyping = function() {
  socket.emit('userTyping', userName);
}

$(function () {        
  $('#username').submit(function(e){
    e.preventDefault(); // prevents page reloading
    playerName = $('#u').val();
    socket.emit('username', userName);

    $('#u').val('');
    document.getElementById('username').style.display = "none";
    return false;
  });

  $('#chat').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val(), userName);

    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg, user){
    $('#messages').append($('<li>').text(user + ": " + msg));
  });

  socket.on('system message', function(msg, user) {
    $('#messages').append($('<li>').text(user + msg));
  });
});