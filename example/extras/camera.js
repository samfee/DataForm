(function () {

	// First, get a reference to both the selected image and where the image is to be displayed. 
	var takePicture = document.getElementById('take-picture');

	if (takePicture) {
		
		/*
			Once a picture has been selected, whether it be from the file system or from the camera,
			fire the onchange event.
		*/
		takePicture.onchange = function (event) {
			

			var file = takePicture.files[0],
				reader = new FileReader(),
				showPicture = document.createElement('img');

			reader.onloadend = function () {

				showPicture.src = reader.result;
				showPicture.setAttribute('id', 'show-picture');

			};

			if (file) {

				reader.readAsDataURL(file);

			} else {

				showPicture.src = "";

			}

			takePicture.parentNode.appendChild(showPicture);

		};

	}

})();