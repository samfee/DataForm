
/*  Create the database (1024 * 1024 represents size rows * columns)*/
var db = openDatabase('A_nameDB3', '1.0', 'database_name', 2 * 1024 * 1024);

/* Create tables if they don't exist; if they exist, create is ignored. */
$(document).ready(function () {

	/* Create a table with the name 'table_name' */
	db.transaction(function (tx) {

		tx.executeSql('CREATE TABLE IF NOT EXISTS table_name (UNIQUE_ID INTEGER PRIMARY KEY, Field1 TEXT, Field2 TEXT, Field3 TEXT, Field4 TEXT, Field5 TEXT)', []);
	
	});

	//The submit function hooks into the submit button for the form.*/
	$('#SampleForm').submit(function (event) {
		
		event.preventDefault();

		//Now insert the data. The function places the main content in the row. You could add more functions here if you had additional tables in the database.
		insertData(null, $('#Field1').val(), $('#Field2').val(), $('#show-picture').attr('src'), $('#latitude').val(), $('#longitude').val());

		return false;
		
	});

	//Define the insert data function
	function insertData(UNIQUE_ID, Field1, Field2, Field3, Field4, Field5) {

		db.transaction(function (tx) {

			tx.executeSql('INSERT INTO table_name (UNIQUE_ID, Field1, Field2, Field3, Field4, Field5) VALUES ( ?, ?, ?, ?, ?, ?)', [UNIQUE_ID, Field1, Field2, Field3, Field4, Field5]);

		});

	}

	$('#sync-btn').on('click', function (event) {

		event.preventDefault();

		db.transaction(function (tx) {

			tx.executeSql('SELECT * FROM table_name', [], function(tx, results) {
				
				var len = results.rows.length,
					arr = [];

				for(var i=0; i<len; i++){

					var item = results.rows.item(i);

					arr.push(item);
				
				}


				if (arr.length) {

					$.ajax({
						type : 'POST',
						url  : './inc/saveData.php',
						data : JSON.stringify(arr),
						success : function () {
							
							$('.output').html('Successfully sent to server.');

							setTimeout(function () {
								$('.output').fadeOut();
							}, 2000);
						},
						error: function (xhr, ajaxOptions, thrownError) {
							alert(xhr.status);
							alert(thrownError);
						}
					});

				} else {
					console.log('Array is empty.');
				}

			});

		});

	});

	//Disable button if there's no internet connection
	if(!navigator.onLine) {

		$('#sync-btn').attr('disabled', 'disabled');

	}

});