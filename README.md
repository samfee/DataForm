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
In the bottom right-hand side of the screen, there is a button labeled ‘code.’ Click this, copy the HTML, and paste this into the provided starter HTML template where it says “Insert Custom Codiqa HTML Here. That is it for form setup. Here’s an example of what the code might look like:

    <!-- Insert Custom Codiqa HTML here. --> 

     <div data-role="page" data-control-title="Home" id="page1"> 

       <div data-theme="a" data-role="header" data-position="fixed"> 

       <h3> Codiqa</h3> 

       </div> 

 <div data-role="content"> 

 <form id="SampleForm" action=""> 

 <div data-role="fieldcontain" data-controltype="textinput"> 

 <label for="Field1"> 

 Field1 

 </label> 

 <input name="" id="Field1" placeholder="" value="" 

type="text"> 

 </div> 

 <div data-role="fieldcontain" data-controltype="textinput"> 

 <label for="Field2"> 

 Field2 

 </label> 

 <input name="" id="Field2" placeholder="" value="" 

type="number"> 

 </div> 

 <input type="submit" value="Submit"> 

 </form> 

 </div> 

 </div> 

 <!-- / Custom Codiqa Code —>
