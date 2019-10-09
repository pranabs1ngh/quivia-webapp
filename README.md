# Quivia : Play quiz from over 100,000 question

URL: https://quivia-webapp.herokuapp.com/

Its a basic practice project, made while learning
MERN stack.

- An user can sign up / sign in using local
  authentication or via google or facebook OAuth
- Clicking on a game matches two idle players if
  present for the same game, else it sends a bot
  to play with

## Getting Started

These instructions will get you a copy of the
project up and running on your local machine for
development and testing purposes.

### Prerequisites

You need to have nodejs and npm installed to run
this app from your pc.

### Installing the required modules

Delete the 'node_modules' folder if present, else
continue. Then, install the npm modules by typing
the following command:

```
npm install
```

Do the same inside the client (React) folder, as
it runs separate from server side.

Create a '.env' file in the root folder and store
the following data:

```
COOKIE_SECRET = *************

MONGO_URI = *****************

GOOGLE_CLIENT_ID = **********

GOOGLE_CLIENT_SECRET = ******

FACEBOOK_APP_ID = ***********

FACEBOOK_APP_SECRET = *******
```

> Get google/facebook client id and secret by
> creating a new app from their developers'
> section

Now Change the socket connection url inside
'/client/src/components/Gameplay.js' (line 19) as
follows:

```
this.socket = io.connect(devURI)
```

> Now uncomment line 18

## Running the app

To run the server, type the command:

```
npm run dev
```

To run the React server, change directory to
client and then, type the command:

```
npm run start
```

You can edit the source files, which are present
in the src folder. You can live test them on the
React webpack server. React static build files
will automatically get created on deployment.

## Built With

- MongoDB
- Express
- React
- NodeJs
- Socket.io

## Author

- **Pranab K Singh**

## License

This project is licensed under the MIT License -
see the
[LICENSE.md](https://www.mit.edu/~amini/LICENSE.md)
file for details
