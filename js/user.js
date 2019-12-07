$.ajax({
    type : 'GET',
    url : 'http://localhost:8080/logged',
    async : true,
    cache : true,
    headers : {
      "Content-Type": "text/plain"
    },
    success : function(resp) {
      console.log(resp);
      if(!resp.loggedIn) 
      {
        console.log("FALSE")
        document.getElementById("user").innerHTML = "";
        document.getElementById("userProfile").innerHTML = "";
        document.getElementById("corporateProfile").innerHTML = "";
      } else
      {
        console.log("TRUE");
        document.getElementById("user").innerHTML = '<a onclick="logout();" href="index.html">' + resp.username + '</a>';
        
        if(resp.userType == "USER")
          document.getElementById("userProfile").innerHTML = 
                '<a href="user-profile.html">User Profile</a>';
        if(resp.userType == "CORPO")
           document.getElementById("corporateProfile").innerHTML = '<a href="corporate-user.html">Corporate Profile</a>';
      }
    }
  });
  
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