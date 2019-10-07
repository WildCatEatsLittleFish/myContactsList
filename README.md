## Demo
* [Simple Contacts List with React]( https://wildcateatslittlefish.github.io/myContactsList/)


## Information

### This project contains a contacts list app and a backend server.
The backend server is only capable of receiving uploaded image file by POST requests from the app and showing the name of received image file in the console. 
For future work, a database system should be implemented to manage data for the app.
Without the help of database, the frontend app now stores contacts data using localStorage of the browser.


## Getting Started

Run the frontend app
```
git clone https://github.com/WildCatEatsLittleFish/myContactsList.git
cd myContactsList && cd app
npm start
```

Run both app and backend server
```
git clone https://github.com/WildCatEatsLittleFish/myContactsList.git
cd myContactsList
cd backend && node server.js
cd ..
cd app
npm start
```
