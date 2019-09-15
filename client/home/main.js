//client
function showSignIn() {
  var signInContainer = document.getElementById("SignInContainer");
  if(signInContainer.style.display == "none")
    SignInContainer.style.display = "block";
  else
    SignInContainer.style.display = "none";
}

modal = document.getElementById('myModal');

$('#createSchool').click(function() {
  document.getElementById("createContainer").style.display = "none";
  document.getElementById("lessonCreateContainer").style.display = "none";
  document.getElementById("schoolCreateContainer").style.display = "inline";
  modal.style.display = "block";
});

$('#createLesson').click(function() {
  document.getElementById("createContainer").style.display = "none";
  document.getElementById("lessonCreateContainer").style.display = "inline";
  document.getElementById("schoolCreateContainer").style.display = "none";
  modal.style.display = "block";
});

$('.close').click(function() {
  modal.style.display = "none";
  document.getElementById("createContainer").style.display = "block";
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("createContainer").style.display = "block";
  }
}

//socket
var socket = io();

//sign in
var signInUsername = document.getElementById("SignInForm-username");
var signInPassword = document.getElementById("SignInForm-password");
var signIn = document.getElementById("SignInForm-submit");

signIn.onclick = function() {
  socket.emit('signIn', {username:signInUsername.value, password:signInPassword.value});
}

//other
socket.on('updateSchool', function(response) {
  console.log(response);
  document.getElementById("headerSchoolName").innerHTML = response.school_name;
  document.getElementById("schoolCreateContainer").style.display = "none";
  document.getElementById("createContainer").style.display = "inline";
});