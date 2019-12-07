logged()
	.done(function (resp) {
		userID = resp.userId;
		document.getElementById("corporationId").innerHTML = "CorporationID: " + userID;
	})
	.fail(function () {
		console.log("failed to get new user ID")
	});

function postHotelDataToApi() {
	var jsonData = {
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
	});
}

function deleteDataFromApi(i) {
	$.ajax({
		type: "DELETE",
		url: "http://localhost:8080/reservation/?reservationId=" + i,
		headers: {
			"Content-Type": "application/json",
			"Accepct": "application/json"
		},
		success: function () {
			window.location.reload(false);
		},
		error: function () {
			window.alert("Can't delete this reservation.")
		}
	})
}

var url = "http://localhost:8080/reservation?corporationId=1";

$.getJSON(url, function (data) {

	for (var i = 0; i < data.length; i++) {

		var roomType;
		var roomTypeId;
		if (roomTypeId % 2 == 0) {
			roomType = "VIP"
		} else {
			roomType = "STANDARD"
		};

		var id = userID;

		var yearStart = data[i]["reservationStart"]["0"] + data[i]["reservationStart"]["1"] + data[i][
			"reservationStart"
		]["2"] + data[i]["reservationStart"]["3"]
		var monthStart = data[i]["reservationStart"]["5"] + data[i]["reservationStart"]["6"]
		var dayStart = data[i]["reservationStart"]["8"] + data[i]["reservationStart"]["9"]

		var yearEnd = data[i]["reservationEnd"]["0"] + data[i]["reservationEnd"]["1"] + data[i][
			"reservationEnd"
		]["2"] + data[i]["reservationEnd"]["3"]
		var monthEnd = data[i]["reservationEnd"]["5"] + data[i]["reservationEnd"]["6"]
		var dayEnd = data[i]["reservationEnd"]["8"] + data[i]["reservationEnd"]["9"]

		var tr = "<div class='table-row'>" +
			"<div class='serial'>" + id + "</div>" +
			"<div class='visit'>" + data[i]["hotelsId"] + "</div>" +
			"<div class='visit'>" + roomType + "</div>" +
			"<div class='visit'>" + yearStart + "-" + monthStart + "-" + dayStart + "</div>" +
			"<div class='visit'>" + yearEnd + "-" + monthEnd + "-" + dayEnd + "</div>" +
			"<div class='visit'>" + roomType + "</div>" +
			"<div class='visit'>" + roomType + "</div>" +
			"<div class='visit'><input type='button' value='Delete' onclick='deleteDataFromApi(" + id +
			")' class='genric-btn danger' /></div></div>";
		$("#reservations").append(tr);
	}
});