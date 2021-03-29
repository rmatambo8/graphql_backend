# graphql_backend
A simple shopping cart app that uses React Redux(w/redux-thunk) front end powered by a graphql backend that goes to a mongoDB database.

you need an Atlas MongoDB account.
Steps:

`1. cd client`

`2. npm install` (or the yarn equivalent)

`3. cd ../server`

`4. npm install`

`5. create a .env file inside of server`

`6. input DB=mongodb Access String in the .env`(if this is foreign, find a tutorial on how to get the access string for mongoDB)

`7. npm run dev` from server


options:

A. Go to `localhost:5000/graphql` to use the graphql interface and make direct queries to the database

B. go to `localhost:3000/` to use the front end shopping cart app.


key files:

`/server/index.js` - starting point for server

`/client/src/api/index.js` - shows all axios calls from the client and an example response

`/client/src/constants/graphQLconstants.js

happy coding


