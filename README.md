# contact-book-app

Web-based contact book application using Javascript, Node.js &amp; SQL Database

# Functions:

• User is able to add a new contact.<br>
• User is able to edit an existing contact.<br>
• User is able to view all the contacts in a paginated form. (Pagination is left for frontend but on backend the functionality is there)<br>
Only 5 contacts are fetched for a page.
• User is able to soft delete a contact. (i.e. The contact stays in the database but is not seen on the UI)<br>
• User is able to search through the contacts by any field<br>
• By default, all the contacts are sorted by Full Name.<br>

# Steps to Follow:

1. Clone the repository: `git clone https://github.com/veerprakash28/contact-book-app.git`
2. Navigate to the project directory: `cd contact-book-app`
3. Install dependencies: `npm install`
4. Setup your mySQL database by create a `.env` file and add the following env variables

   - DB_HOST: the hostname of your MySQL server (default: localhost)
   - DB_USER: the username for your MySQL database
   - DB_PASSWORD: the password for your MySQL database
   - DATABASE: the name of your MySQL database
   - DB_PORT: the database port number

   If that don't works, then change the variables names in connection.js file
   host: "localhost",
   user: "your_userName",
   password: "your_password",
   database: "your_databaseName", (contactbook)
   port: 3306,

5. Create the database tables by running the SQL script provided in the `script.txt` fie

6. Start the Server: `npm start`

# USAGE:

Once the server is running, you can use the following endpoints to retrieve data:

1. POST /book/addContact: Used to create new contact
2. GET /book/viewAllContact?limit=5&pageNo=1: Fetches All Contacts list that are not deleted (limit and pageNo are optional)
3. PUT /book/editContact: Used to update Existing Contact
4. DELETE /book/deleteContact: Used to soft delete a contact
5. GET /book/searchContact?searchValue=? : Used to search a contact on the basis of any field

# Screenshots:

HOMEPAGE (WHEN there are no Contacts)
![homepage](./public/homepage.png)

1. Curl for addContact endpoint:
