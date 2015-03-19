(function () {

	var longitude = document.getElementById('longitude'),
		latitude = document.getElementById('latitude'),
		msg = 'Sorry, we were unable to get your location.';

	if(navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(success, fail);
		longitude.setAttribute('placeholder', 'Checking longitude...');
		latitude.setAttribute('placeholder', 'Checking latitude...');

	} else {

		longitude.setAttribute('placeholder', msg);
		latitude.setAttribute('placeholder', msg);
	}

	function success(position) {
		longitude.value = position.coords.longitude;
		latitude.value = position.coords.latitude;
	}

	function fail (msg) {
		longitude.setAttribute('placeholder', msg.message);
		latitude.setAttribute('placeholder', msg.message);
	}

})()