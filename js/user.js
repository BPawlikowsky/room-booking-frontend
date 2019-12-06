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
      document.getElementById("user").innerHTML = resp;
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