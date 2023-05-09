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
![homepage](https://github.com/veerprakash28/contact-book-app/assets/94482800/abc9c286-8684-4868-ace8-594123c6f341)

1. Curl for addContact endpoint:
`curl --location 'http://localhost:3000/book/addContact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name": "Emily",
    "middle_name": "E",
    "last_name": "Davis",
    "email": "emily.davis@example.com",
    "phone_number_1": "+1 (555) 444-5555",
    "phone_number_2": "",
    "address": "789 10th Ave"
}'`

Backend: 
![addContact-backend](https://github.com/veerprakash28/contact-book-app/assets/94482800/e4c13c2e-2fef-4b8c-892a-63342a9666de)

Frontend:
![addContact-frontend](https://github.com/veerprakash28/contact-book-app/assets/94482800/fd03a57e-6d87-446b-8a31-0a5f73d310d9)

2. Curl for viewAllContact endpoint:
`curl --location 'http://localhost:3000/book/viewAllContact?limit=5&pageNo=1'`

Backend:
![viewAllContacts-backend](https://github.com/veerprakash28/contact-book-app/assets/94482800/75c35a99-20da-46f1-8b5b-3f2245d569a8)

Frontend:
![viewAllContacts-frontend](https://github.com/veerprakash28/contact-book-app/assets/94482800/e453537d-fa2b-479e-b5f9-d6aeed9f9f39)

3. Curl for editContact endpoint:
`curl --location --request PUT 'http://localhost:3000/book/editContact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "samantha.hernandez@example.com",
    "first_name": "Samantha",
    "middle_name": "K",
    "address": "USA"
}'`

Backend:
![editContact-backend](https://github.com/veerprakash28/contact-book-app/assets/94482800/3ed4488f-d5ff-4495-ad29-e70b8050a315)

Frontend:
![editContact-frontend](https://github.com/veerprakash28/contact-book-app/assets/94482800/fec6c024-a78c-46fc-a5f9-ab6066c87722)

4. Curl for deleteContact endpoint:
`curl --location --request DELETE 'http://localhost:3000/book/deleteContact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "samantha.hernandez@example.com"
}'`

Backend:
![deleteContact-backend](https://github.com/veerprakash28/contact-book-app/assets/94482800/0a8b4d0f-4a5d-43a8-aae4-da23436caf97)

Frontend:
![deleteContact-frontend](https://github.com/veerprakash28/contact-book-app/assets/94482800/8472fff2-cf63-4f70-9343-4ca92c0714c6)

5. Curl for searchContact endpoint:
`curl --location 'http://localhost:3000/book/searchContact?searchValue=john'`

Backend:
![searchContact-backend](https://github.com/veerprakash28/contact-book-app/assets/94482800/54a2e10c-629e-4d87-a58c-c629abc7763d)

Frontend:
![searchContact-frontend1](https://github.com/veerprakash28/contact-book-app/assets/94482800/06516d12-ebb9-466c-b561-fc0622b6b403)

![searchContact-frontend2](https://github.com/veerprakash28/contact-book-app/assets/94482800/c7d1bad0-4d7a-4a96-a7aa-e09c5f2737bd)

# FINAL
![final](https://github.com/veerprakash28/contact-book-app/assets/94482800/04148b40-c85a-4e6e-bb2c-06bda75b0ed7)

