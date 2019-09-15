//client
function showSignIn() {
  var signInContainer = document.getElementById("SignInContainer");
  if(signInContainer.style.display == "none")
    SignInContainer.style.display = "block";
  else
    SignInContainer.style.display = "none";
}

modal = document.getElementById('myModal');

$('#createLesson').click(function() {
  document.getElementById("main").style.display = "none";
  document.getElementById("lessonCreateContainer").style.display = "inline";
  modal.style.display = "block";
});

$('.close').click(function() {
  modal.style.display = "none";
  document.getElementById("lessonCreateContainer").style.display = "none";
  document.getElementById("main").style.display = "inline";
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("lessonCreateContainer").style.display = "none";
    document.getElementById("main").style.display = "inline";
  }
}


//socket
var socket = io.connect('/');

//sign in
var signInUsername = document.getElementById("SignInForm-username");
var signInPassword = document.getElementById("SignInForm-password");
var signIn = document.getElementById("SignInForm-submit");

signIn.onclick = function() {
  socket.emit('signIn', {username:signInUsername.value, password:signInPassword.value});
}

//dynamically change form action based on choice

$('[name=lessonTeacher]').prop("checked") == true;

$('[name=lessonTeacher]').change(function() {
  var selected = $('[name=lessonTeacher]').prop("checked");
  
  switch(selected) {
    case true:
      $("#lessonCreateForm").attr('action', 'http://localhost:3000/teacherLesson');
      break;
    case false:
      $("#lessonCreateForm").attr('action', 'http://localhost:3000/studentLesson');
      break;
    default:
      break;
  };
});



//load page and get info from home

socket.on('schoolPageInfo', function(schoolResponse) {
  console.log('school page info received');
  console.log(schoolResponse);
  document.getElementById("schoolName").innerHTML = schoolResponse.school_name;
});

window.onload = function() {
  socket.emit('schoolPageReady');
  console.log("school page ready");
};