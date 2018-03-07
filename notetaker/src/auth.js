 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("signUp_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null) {

      var email_id = user.email;
      var email_verified = user.emailVerified;

    }
  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("signUp_div").style.display = "block";
  }
});


function login() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function(firebaseUser){
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  alert("Error : " + errorMessage);
  // ...
  });
}

function createAccount() {
  var userEmail = document.getElementById("email_create").value;
  var userPass = document.getElementById("password_create").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .then(function(firebaseUser){
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  alert("Error : " + errorMessage);
  // ...
  });

}

function logout() {
    firebase.auth().signOut()
    .then(function(){
      //sign out sucessful
    })
   .catch(function(error) {
     //some error
   });
}
