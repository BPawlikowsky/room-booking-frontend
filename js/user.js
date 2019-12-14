var userID = 0;
var userName = "";

function logged() {
  
  return $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/logged',
    async: true,
    cache: true,
    headers: {
      "Content-Type": "text/plain"
    },
    success: function (callback) {
      console.log(callback);
    }
  });

}

function checkLogin(resp) {
  if (!resp.loggedIn) {
    console.log("FALSE")
    document.getElementById("login").innerHTML = '<a href="login.html">Login</a>';
    document.getElementById("register").innerHTML = '<a href="register.html">Register</a>';
    document.getElementById("user").innerHTML = "";
    document.getElementById("userProfile").innerHTML = "";
    document.getElementById("corporateProfile").innerHTML = "";
  } else {
    console.log("TRUE " + resp.userId.toFixed());

    userName = resp.username;
    
    if (document.getElementById("wellcome") != null) document.getElementById("wellcome").innerHTML = "Wellcome " + userName + "!";
    document.getElementById("user").innerHTML = userName + '<a onclick="logout();" href="index.html"> (LOGOUT)</a>';

    switch (resp.userType.toString()) {
      case 'USER': {
        
        document.getElementById("login").innerHTML = "";
        document.getElementById("register").innerHTML = "";
        document.getElementById("userProfile").innerHTML = '<a href="user-profile.html">User Profile</a>';
      }
        break;
      case 'CORPO': {
        
        document.getElementById("login").innerHTML = "";
        document.getElementById("register").innerHTML = "";
        document.getElementById("corporateProfile").innerHTML = '<a href="corporate-user.html">Corporate Profile</a>';
      }
        break;
    }
  }
  returnuserID = resp.userId;
  console.log("user ID in response: " + resp.userId);
  userName = resp.username;
  return userID;
}



logged().done(checkLogin).fail(function () { console.log("FAIL...");});
  
function logout() {
  $.ajax({
      type : 'GET',
      url : 'http://localhost:8080/logout/',
      async : true,
      cache : true,
      headers : {
        "Content-Type": "text/plain"
      },
      success : function(resp) {
        console.log(resp);
      }
    });
}