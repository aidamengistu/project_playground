# project_playground
WDI Seattle 02 Project

Project #1
Submitted April 17, 2015

This project is a website that searches for parks and playgrounds in the city of Seattle.
It allows the user to search by park feature or by entering the name of the park.

Technologies used:
* Postgres sequel database (data was imported from the City of Seattle's open data as a CSV file directly into Postgres)
* Javascript
* Jquery
* 2 APIs: Flickr (for park profile images) and Mapbox (for maps)
* Bootstrap
* HTML5
* CSS3

Npm Modules:
* async (to deal with multiple database calls in a single route)
* bcrypt (for password encryption)
* body-parser
* connect-flash
* ejs
* express
* express-session

Process description:
Started out by importing the data from city of Seattle: https://data.seattle.gov/Community/Parks-and-Park-Features/rhf2-u5fm (see notes.txt for process)
Data was exported as a CSV file directly into a Postgres sequel database.  Initally got all the data in a table called features.
Later, the table called features was split up into 3: parks and parkfeatures and their join table parkfeaturesparks.  I also had 2 additional tables: users (for username, email and password storage) and reviews (to store users' reviews)

To do:
* Display a maximum of 50 markers
* Display list of parks in alphabetical order
* see if there's a way to get better, topic-fitting images from Flickr
* a better display for the features
* add star rating
* open city of seattle link in different tab
* add icons for the different features
* change styling of checkboxes
* timestamp and name stamp the comments
* add crime rate in the area
* make the Flickr images bigger on click
* display parks in alphabetical order OR display in order of closest location to farthest
* add an option to search by zip code




