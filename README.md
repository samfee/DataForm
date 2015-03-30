##Introduction

This is a tutorial on how to build a data collection application capable of working offline. This could be useful in a variety of ways, especially when you need to save data to a database but there is no internet connection. This is the case in a lot of field data collection settings, such as archaeological sites. Topics to be discussed include how to set up the form, saving the data to a WebSQL database, setting up location data using the Geolocation API, uploading images using the Camera API, and exporting the data to a server database once an internet connection is present.

##Getting Started
Use the starter index.html file included with the project. This is a basic template to get you started. It includes the jQuery Mobile CSS stylesheet, the jQuery JavaScript file, and the jQuery Mobile JavaScript file. Because one of the goals of the project is to have an application that works offline, we are using the actual source code for the libraries as opposed to the CDNs.

    <!DOCTYPE html>
    <html lang="en"> 
    <head> 
     <meta charset="UTF-8"> 
     <title>Sample App</title> 
     <!-- jQuery Mobile Stylesheet --> 
     <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css" /> 
    </head> 
    <body> 
    
     <!-- Insert Custom Codiqa HTML here. --> 
    
     <!-- / Custom Codiqa Code --> 
    
    <!-- jQuery Library --> 
    <script src="js/2.1.3/jquery.min.js"></script> 
    
    <!-- jQuery Mobile Library --> 
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script> 
    
    <!-- SQL Boilerplate --> 
    <script src="sql_boilerplate.js"></script> 

    </body> 

    </html>

You can see that there is a section in the body labeled “Insert Custom Codiqa HTML here.” This is where the form will go. I am using Codiqa to generate the HTML for the form.

##Codiqa Code
To start, go to https://codiqa.com and click “Or Try the Demo.” Once you’re viewing the interface, you can decide whether to design for iPad or iPhone by clicking the device icon in the top menu. We are making a form, so click the form element on the left-hand side and drag it onto the device. There are a ton of options to customize but make sure you fill out the Form ID 
field. Remember it because you’ll need it for later. For each input that you need in your form, drag that element into the form on the device. Give each input a unique ID. You’ll use this later as well. Finally, remember to add a submit button.
In the bottom right-hand side of the screen, there is a button labeled ‘code.’ Click this, copy the HTML, and paste this into the provided starter HTML template where it says “Insert Custom Codiqa HTML Here.

##Hooking Into the SQL Boilerplate
Now that you the form is working, let’s get to saving some data. A SQL boilerplate file has been included with the project. It will need to modified to fit your form. Go ahead and open it in a text editor to start. 

First up is to name and create the database.
````
/* Create the database (1024 * 1024 represents size rows * columns)*/ 
var db = openDatabase(‘a_nameDB', '1.0', 'database_name', 2 * 1024 * 1024);
````

This line creates the database, gives it a name, a version, a descriptive name, and then defines the size of the database. Change ````a_nameDB```` to the name of your database, and change ````database_name```` to a descriptive name.

````
/* Create a table with the name 'table_name' */ 
db.transaction(function (tx) { 
 tx.executeSql('CREATE TABLE IF NOT EXISTS table_name (UNIQUE_ID INTEGER PRIMARY KEY, Field1 TEXT, Field2 INTEGER)', []); 
});
````

This is the statement that creates a table in the database. Change table_name to be the name of your table. In the example, we have three fields. The first is the UNIQUE_ID of the table, the field that will identify each row in the database. The other two fields match each input we have in our form. In the form, we have an input that accepts a text value, and an input that accepts a number value. This is reflected in the table. Field1 is a TEXT type, and Field2 is an INTEGER type. In additional to the primary key, you must have a field in your database for each input that you have in your form.

````
$('#SampleForm').submit(function() {
 insertData(null, $('#Field1').val(), $(‘#Field2').val()); 
 return false; 
});
````

The above code uses the jQuery submit method to handle the submission of the data. Where it
says ````$(‘#SampleForm’)````, change this value ‘SampleForm’ to the ID of your form that you 
chose earlier.

The submit function calls another function, insertData. This function is defined later in the script. 
It takes as its arguments, each of the values of the inputs of your form. The first value is null, 
which is used to populate the UNIQUE_ID of your table. When you pass through a null value, it 
knows to auto increment that value, giving each row of the table a new ID when submitted. 
The second and third arguments are whatever values have been inputted into those fields in the 
form. You should change ‘Field1’ and ‘Field2’ to match the unique IDs of the inputs that you 
have for each of your form elements. 

The actual insertData function is defined below:
````
function insertData(UNIQUE_ID, Field1, Field2) { 
 db.transaction(function(tx) { 
   tx.executeSql('INSERT INTO table_name2 (UNIQUE_ID, Field1, Field2) VALUES ( ?, ?, ?)', [UNIQUE_ID, Field1, Field2]); 
 }); 
}
````

This function takes in three values: a unique ID, and the values for two fields from our form. Within the function is WebSQL statement that inserts the values into the table. All of these values must match. Add in your Fields to the function and to the sql statement within the function. There must be a question mark (?) for each value inserted. So if you are inserting five values, there must be five question marks.

To test to see if you have everything set up correctly, open the application in Chrome and fill out the form. Click submit. Open the Developer Tools, Click Resources > Web SQL > YourDatabaseName > YourTableName and see if there is data in the table to the right. If there is, then it’s set up correctly. If not, repeat the steps and make sure there all inputs have a unique ID and all of these are inserted into the table.

##Inserting an Image Into the Database
If you want to upload an image to the database, follow these steps. 

What we want to do is have a form input that accepts a file, displays a thumbnail of the file, and then uploads to the database a base64 encoded string that references the image. There’s a camera.js file included with the project. Add this to the index.html page at the bottom. Add an input to your form that looks like this (if you’re using Codiqa):

````
<div data-role="fieldcontain" data-controltype="textinput"> 
 <label for="Field3">Field3</label> 
 <input name="" id="take-picture" placeholder="" value="" type="file" accept="image/*"> 
</div>
````
Important things to note are the ID on the input, and the “type” and “accept” attributes of the input. Make sure these are included exactly as shown in order for the camera.js script tofunction properly. The “file” attribute lets the browser know that you want to upload a file. On supported mobile devices, this will also give you the option to take a picture using the camera of the device.

Once an image is selected, the thumbnail will automatically appear on the form. This is an important step, because the src of that displayed image is a base64 encoded string, which is what we will upload to the database instead of the image itself. It might be a good idea to add some CSS that will style the thumbnail to be the size that you’d like it to be. Otherwise, it will load into the page at its full size.

Now we need to modify the sql boilerplate file to accept the new image.

````
$('#SampleForm').submit(function() {
 insertData(null, $('#Field1').val(), $(‘#Field2’).val(), $(‘#show-picture’).attr(‘src’); 
 return false;
});
````

You can see that a new value has been added to the insert statement. When the thumbnail is added to the page, the camera.js file adds a unique ID of ‘show-picture’ to the image. The insertData statement uses a jQuery selector .attr to get the value of the src of the image. This value of src is the base64 encoded url that we’ll be uploading to the database.

You must also modify your insertData function where it’s defined, so that it matches the new inputs.
````
function insertData(UNIQUE_ID, Field1, Field2, Field3) { 
 db.transaction(function(tx) { 
   tx.executeSql('INSERT INTO table_name2 (UNIQUE_ID, Field1, Field2, Field3) VALUES ( ?, ?, ?, ?)’, [UNIQUE_ID, Field1, Field2, Field3]); 
 }); 
}
````

You can see that it now has four inputs in each section. For each input that you add, you must add a new field to the insert statements. To test that it works, open the app in your browser and try to upload the data into the database.

##Adding Geolocation
The Geolocation API is a newer feature that browsers have recently begun to implement. The user is promoted to share his or her location with the website, and then location data is provided in return. At minimum, latitude and longitude are returned, but other data such as altitude can be included. For more information, read the Geolocation API documentation.

To use this implementation of geolocation, be sure to include the geolocation source file in your index.html page. 
Geolocation works by first checking to make sure that it is supported in the browser.

````
if(navigator.geolocation) {
 // Do something
}
````

If it is supported, ````getCurrentPosition()```` is called. The user is prompted to accept that their location be disclosed. If it is not supported, the inputs that would normally display longitude and latitude instead display the reason that location could not be found. 

The getCurrentPosition function has two parameters: a success function and a failure function. If latitude and longitude are successfully returned, then the success function is called. If not, the fail function is called. If it fails, the inputs will display the reason that location could not be determined. If successful, the latitude and longitude are displayed as non-editable values in the inputs.
