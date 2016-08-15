function module_time_setTime() {
	var time = new Date();

	var hours = time.getHours();
	var minutes = time.getMinutes();

	minutes = module_time_checkTime(minutes);

	var dd = time.getDate();
	var year = time.getFullYear();

	var day = "";
	var month = "";

	switch(time.getDay()){
		case 0:
			day = "Zondag";
			break;
		case 1:
			day = "Maandag";
			break;
		case 2:
			day = "Dinsdag";
			break;
		case 3:
			day = "Woensdag";
			break;
		case 4:
			day = "Donderdag";
			break;
		case 5:
			day = "Vrijdag";
			break;
		case 6:
			day = "Zaterdag";
			break;
		default:
			day = "Error";
			break;
	}

	switch(time.getMonth()) {
		case 0:
			month = "Januari";
			break;
		case 1:
			month = "Februari";
			break;
		case 2: 
			month = "Maart";
			break;
		case 3:
			month = "April";
			break;
		case 4:
			month = "Mei";
			break;
		case 5:
			month = "Juni";
			break;
		case 6:
			month = "Juli";
			break;
		case 7:
			month = "Augustus";
			break;
		case 8:
			month = "September";
			break;
		case 9:
			month = "October";
			break;
		case 10:
			month = "November";
			break;
		case 11:
			month = "December";
			break;
		default:
			month = "Error";
			break;
	}

	document.getElementById('time').textContent = hours + ":" + minutes;
	document.getElementById('date').textContent = day + " " + dd + " " + month + " " + year;

	var t = setTimeout(module_time_setTime, 30000);
}

function module_time_checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}
	return i;
}