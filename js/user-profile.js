var i;


function deleteDataFromApi(i) {
	$.ajax({
		type: "DELETE",
		url: "http://localhost:8080/reservation/?reservationId=" + i,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		success: function () {
			window.location.reload(false);
		},
		error: function () {
			window.alert("Can't delete this reservation.");
		}
	});
}

var x = logged().responseJSON.userId;
console.log(x);


var url = "http://localhost:8080/reservation?userId=" + userIdUrl;

$.getJSON(url, function (data) {
	for (var i = 0; i < data.length; i++) {
		var roomTypeId = data[i]["roomTypeId"]
		var roomType;
		if (roomTypeId % 2 != 0) {
			roomType = "STANDARD";
		} else {
			roomType = "VIP";
		}

		var id = data[i]["id"];

		var yearStart =
			data[i]["reservationStart"]["0"] +
			data[i]["reservationStart"]["1"] +
			data[i]["reservationStart"]["2"] +
			data[i]["reservationStart"]["3"];
		var monthStart =
			data[i]["reservationStart"]["5"] + data[i]["reservationStart"]["6"];
		var dayStart =
			data[i]["reservationStart"]["8"] + data[i]["reservationStart"]["9"];

		var yearEnd =
			data[i]["reservationEnd"]["0"] +
			data[i]["reservationEnd"]["1"] +
			data[i]["reservationEnd"]["2"] +
			data[i]["reservationEnd"]["3"];
		var monthEnd =
			data[i]["reservationEnd"]["5"] + data[i]["reservationEnd"]["6"];
		var dayEnd =
			data[i]["reservationEnd"]["8"] + data[i]["reservationEnd"]["9"];

		var tr =
			"<div class='table-row'>" +
			"<div class='serial'>" +
			id +
			"</div>" +
			"<div class='visit'>" +
			data[i]["hotelsId"] +
			"</div>" +
			"<div class='visit'>" +
			roomType +
			"</div>" +
			"<div class='visit'>" +
			yearStart +
			"-" +
			monthStart +
			"-" +
			dayStart +
			"</div>" +
			"<div class='visit'>" +
			yearEnd +
			"-" +
			monthEnd +
			"-" +
			dayEnd +
			"</div>" +
			"<div class='visit'>" +
			data[i]["fullReservationPrice"] +
			"</div>" +
			"<div class='visit'>" +
			data[i]["status"] +
			"</div>" +
			"<div class='visit'><input type='button' value='Delete' onclick='deleteDataFromApi(" +
			id +
			")' class='genric-btn danger' /></div></div>";
		$("#reservations").append(tr);
	}
});