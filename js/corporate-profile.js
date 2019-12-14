logged()
	.done(function (resp) {
		userID = resp.userId;
		document.getElementById("corporationId").innerHTML = "CorporationID: " + userID;
	})
	.fail(function () {
		console.log("failed to get new user ID")
	});

function patchDataInApi(i, s) {
	var json = {
		reservationId: Number(i),
		status: Number(s)
	}
	console.log(json)
	$.ajax({
			type: "PATCH",
			url: "http://localhost:8080/reservation/status",
			dataType: "json",
			data: JSON.stringify(json),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		})
		.done(function (data, status) {
			console.log("done")
			window.location.reload(false);
		})
		.fail(function (data, status) {
			window.location.reload(false);
		})
}

function postHotelDataToApi() {
	var jsonData = {
		name: $("#name").val(),
		city: $("#city").val(),
		street: $("#street").val(),
		streetNumber: $("#streetNumber").val(),
		phoneNumber: $("#phoneNumber").val(),
		standard: $("#standard").val(),
		corporationId: userID,
		roomsToHotelRequests: [{
				price: $("#priceStandard").val(),
				numOfBeds: $("#numOfBedsStandard").val(),
				numOfRooms: $("#numOfRoomsStandard").val(),
				standard: "STANDARD"
			},
			{
				price: $("#priceVIP").val(),
				numOfBeds: $("#numOfBedsVIP").val(),
				numOfRooms: $("#numOfRoomsVIP").val(),
				standard: "VIP"
			}
		]
	}

	$.ajax({
		type: "POST",
		url: "http://localhost:8080/hotels",
		data: JSON.stringify(jsonData),
		headers: {
			"Content-Type": "application/json",
			"Accepct": "application/json"
		},
		success: function () {
			document.getElementById('success').style.display = "block",
				document.getElementById('error').style.display = "none"
		},
		error: function () {
			document.getElementById('error').style.display = "block",
				document.getElementById('success').style.display = "none"
		}
	})
}

logged().done(function (mydata) {
			var userIdurl = mydata["userId"]

var url = "http://localhost:8080/reservation/corporation?corporationId=" + userIdurl;
	$.getJSON(url, function (data) {
		console.log(data)
		for (var i = 0; i < data.length; i++) {

			var roomType;
			var roomTypeId = data[i]["roomTypeId"];
			var fullReservationPrice = data[i]["fullReservationPrice"];
			var status = data[i]["status"];
			if (roomTypeId % 2 != 0) {
				roomType = "STANDARD"
			} else {
				roomType = "VIP"
			};

			var id = data[i]["id"]

			var yearStart = data[i]["reservationStart"]["0"] + data[i]["reservationStart"]["1"] + data[i]["reservationStart"]["2"] + data[i]["reservationStart"]["3"]
			var monthStart = data[i]["reservationStart"]["5"] + data[i]["reservationStart"]["6"]
			var dayStart = data[i]["reservationStart"]["8"] + data[i]["reservationStart"]["9"]

			var yearEnd = data[i]["reservationEnd"]["0"] + data[i]["reservationEnd"]["1"] + data[i]["reservationEnd"]["2"] + data[i]["reservationEnd"]["3"]
			var monthEnd = data[i]["reservationEnd"]["5"] + data[i]["reservationEnd"]["6"]
			var dayEnd = data[i]["reservationEnd"]["8"] + data[i]["reservationEnd"]["9"]

			var accept = 1;
			var reject = 2;
			var tr = "<div class='table-row'>" +
				"<div class='serial'>" + id + "</div>" +
				"<div class='visit'>" + data[i]["hotelsId"] + "</div>" +
				"<div class='visit'>" + roomType + "</div>" +
				"<div class='visit'>" + yearStart + "-" + monthStart + "-" + dayStart + "</div>" +
				"<div class='visit'>" + yearEnd + "-" + monthEnd + "-" + dayEnd + "</div>" +
				"<div class='visit'>" + fullReservationPrice + "</div>" +
				"<div class='visit'>" + status + "</div>" +
				'<div class="visit"><input type="button" value="Accept" onclick="patchDataInApi(\'' + id + '\',\'' + accept + '\')" class="genric-btn success" /></div>' +
				'<div class="visit"><input type="button" value="Reject" onclick="patchDataInApi(\'' + id + '\',\'' + reject + '\')" class="genric-btn danger"/></div>' +
				"</div>";
			$("#reservations").append(tr);
		}
	})
});