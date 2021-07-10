# AddressBook

## Prerequisites
- Have a locally running SQL Server with the name `MSSQLSERVER2` and a database named `master`

## Usage
- Execute the .sql file in the folder DB (CREATE TABLE command is mandatory, INSERT statements are just for dummy data), on your SQL Server
- Run the API from the API folder with Visual Studio 2019 (run it with ISS Express, so you can access it on the URL: `http://localhost:20047/swagger`)
- Run the website by opening the Website folder in CMD (Command Line) and execute the command `npm install` and after it finishes execute `ng serve`, this will run the website on the URL: `http://localhost:4200/`

## Improvements
### Website
- Make code more readable by creating more components instead of using the same .ts file for multiple modals
- Make code more readable by moving the templates defined with HTML code into separate files and use templateURL
- Fix when adding or deleting new contacts, the number of pages does not update if the record added or deleted caused the records to be moved to one additional or one less page
- Improve the visual looks of the whole application
### DB
- Move address field to a separate table and divide it into street address, house number, city, country, ...
