# Project Name: Unplanned

## Description
Unplanned is a location-based app that brings strangers together over coffee, food, or beer in the spur-of-the-moment. The catch is, they have to make a decision within 13 seconds of someone asking to meet up, otherwise, they'll lose the chance of meeting that person.

The app's goal is to prevent us from overthinking decisions and encourage us to step out of our comfort zone to get to know people who we otherwise would never bother striking up a conversation. It steps away from the idea of never talking to strangers, and instead inspires us to open our minds to share in our human experiences, and perhaps, even build meaningful relationships.

## Table of Contents

1. [Using the App](#using-the-app)
1. [Screenshots](#screenshots)
1. [Prerequisites](#prerequisites)
1. [The Tech Stack](#the-tech-stack)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Understanding the Code Base](#understanding-the-code-base)
    1. [File Structure](#file-structure)
    1. [Where to Begin](#where-to-begin)
1. [Team](#team)
1. [Contributing](#contributing)

## Using the app

Unplanned is a Single-Page Application utilizing the Facebook API for authentication, so a single login will bring you straight to the main app.

Once there, a map will have markers on there that you'll be able to click on to review user information, as well as a "Meet" button to request a meeting. If you tap on meet, the user will receive a request to accept or reject the meeting, and a timer will start counting down from 13.

If they accept, a video call will pop up on both users browsers to quickly discuss meeting up for coffee/food/beer.

If they reject, the user will receive a rejection notice and then be able to go back to the map to hang out with someone else.

You also have the option to filter if you want coffee, food, or beer so it will match you with people who are down for similar things. You can also make take yourself off the map by flipping the Online/Offline button.

## Screenshots
![Main App](https://cloud.githubusercontent.com/assets/15970451/15833829/5289ed2c-2bdd-11e6-826c-68379a715046.png)

![Meet Accept / Reject](https://cloud.githubusercontent.com/assets/15970451/15833835/529ddcf6-2bdd-11e6-96c0-383f7f93a0d2.png) ![Let's Meet Request](https://cloud.githubusercontent.com/assets/15970451/15833836/529e38a4-2bdd-11e6-9268-f2b8b00ed94e.png)

![Waiting on Confirm](https://cloud.githubusercontent.com/assets/15970451/15833837/529f83e4-2bdd-11e6-917c-e29cba66e2f7.png) ![Confirmed Meet](https://cloud.githubusercontent.com/assets/15970451/15833839/52aae112-2bdd-11e6-82d7-3afbbb161fb2.png)

## Prerequisites

Install [Node](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) if you haven't already.

You will also need to grab a few API keys in order to develop for Unplanned:

[Google Maps API Key](https://developers.google.com/maps/documentation/android-api/signup#get_an_api_key_from_the_console_name) - Set the key inside of script tag src in index.html

![Index Html Example](https://cloud.githubusercontent.com/assets/15970451/15833878/81930ce8-2bdd-11e6-888d-ec9300ae9ed1.png)

[Facebook Login Key/APP ID](https://developers.facebook.com/) - You'll want to create a new Login app. Also make sure that you set up the callback inside of the App settings inside Facebook ie http://localhost:8000/auth/facebook/callback. -- This will be set inside webpackEntry.js from the client folder

![Facebook Callback URL](https://cloud.githubusercontent.com/assets/15970451/15833832/528e0722-2bdd-11e6-846b-4cd0638b2fd2.png)

[PeerJS Key](http://peerjs.com/) - For access to Video Calling. You will need to store this in a new file called peer.min.js inside of the public folder. Check the index.html file for reference.

![Peer Key Example](https://cloud.githubusercontent.com/assets/15970451/15833879/8194f526-2bdd-11e6-8aed-561373f3ea77.png)

Everything else will be included inside NPM install.

## The Tech Stack

- Node
- Express
- MonogDB
- Mongoose
- Webpack, Webpack Hotloaders
- React, React Dom, React Google Maps
- Redux
- Eslint
- Babel
- SocketIO

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running The App

After installing all dependencies, turn on MongoDB in terminal:

```sh
mongod
```

then run nodemon on the server.js file:

```sh
nodemon server/server.js
```

You may have to wait for a moment while webpack compiles the code for the very first time. Once it finishes, go to your browser and visit the localhost server on port 8000:

[http://localhost:8000](http://localhost:8000)

The app should be up and running.
## Understanding the Code Base

### File Structure

```sh

Ephemeral Elixir
├── .github/
|   └── PULL_REQUEST_TEMPLATE
|
├── client/
|   └── components/
|   |   ├── meeting/
|   |   |   ├── Accepted.jsx
|   |   |   ├── CountdownTimer.jsx
|   |   |   ├── Rejected.jsx
|   |   |   ├── RequestReceived.jsx
|   |   |   └── RequestSent.jsx
|   |   |
|   |   ├── splash/
|   |   |   ├── AboutTheDevelopers.jsx
|   |   |   ├── Adventure.jsx
|   |   |   ├── Splash.jsx
|   |   |   └── Testimonial.jsx
|   |   |
|   |   ├── App.jsx
|   |   ├── EditProfile.jsx
|   |   ├── Gmap.jsx
|   |   ├── InsertBio.jsx
|   |   ├── Nav.jsx
|   |   ├── Options.jsx
|   |   ├── PeerConfig.jsx
|   |   ├── Popover.jsx
|   |   └── Socket.jsx
|   |
|   ├── public/
|   |   ├── assets/
|   |   |   ├── font-awesome/
|   |   |   ├── img/
|   |   |   ├── fair.mp4
|   |   |   ├── smoothscroll.js
|   |   |   └── style.css
|   |   |
|   |   ├── index.html
|   |   ├── peer.js
|   |   └── webpack.min.js
|   |
|   ├── redux/
|   |   ├── actions.js
|   |   ├── reducer.js
|   |   └── store.js
|   |
|   └── webpackEntry.js
|
├── node_modules/
|
├── server/
|   ├── config/
|   |   ├── middleware.js
|   |   └── socket.js
|   |
|   ├── users/
|   |   ├── userController.js
|   |   └── userModel.js
|   |
|   └── server.js
|
├── specs/
|   └── socket-server-test.js
|
├── .eslintrc.js
├── .gitignore
├── _CONTRIBUTING.md
├── _PRESS-RELEASE.md
├── _STYLE-GUIDE
├── package.json
├── README.md
└── webpack.config.js

```

### Where to Begin

#### Front-End Code Base
The front end views are broken up into multiple components, which are named by their purposes.

1. Data is stored, maintained, and dispatched from the redux store
1. Most of the event and socket request handlers are stored inside Socket.jsx.
1. Each component may have their own functions and handlers as well, since they are only used inside their individual component.

- The components related to the main landing page (splash) are grouped together inside the splash/ directory.
- The components related to the meeting/rejecting requests are grouped inside the meeting/ directory.

#### Server-side Code Base

The server-side code is a lot simpler compared to the front-end. Here's the gist of it:
1. Most of the heavy-duty work is in socket.js
1. In order to maintain a real-time storage of all users that are currently online at one time, we use what we call a "master" activeUsers object on the server side (line 3 of server/config/socket.js).
  1. The user's data (containing their name, image url, bio, phone number, facebook ID) is stored in here using their unique socket ID, which is generated on every unique connection.
  1. The server is responsible for pushing this activeUsers object to every connected client, so that every client can render the locations on the map.
  1. The server is also responsible for keeping the activeUsers object updated in real time, so if a client signs out, the server will remove them from the activeUsers object and then update every connected client.

1. The server uses sockets as a medium for clients to send and listen for individual requests.
  1. A client emits a request event to the server with their unique socket ID and the socket ID of the client they want to meet
  1. The server listens for that request and takes in both socket IDs, and forwards it to the client that is receiving the request
  1. The client receiving the request will see a component rendered, and is given a choice to reject, accept, or do nothing.
  1. In any of those cases, a socket event is fired back to the server with the same two socket IDs
  1. The server forwards this response back to the original requester

[Click here](https://scotch.io/tutorials/a-realtime-room-chat-app-using-node-webkit-socket-io-and-mean) for a brief tutorial on sockets

#### Database Code Base

This application is not database-heavy, so there aren't a lot of code to review here. Just know that:
1. The schema is userID (unique), name, image (the url used to render picture), phone number, and bio.

1. The controller has three functions:
  1. Create and store a new user to the database.
  1. Update an existing user's bio and phone number if they decide to change it.
  1. Check for an existing user in the DB to see it needs to create and save a new one or retrieve,

#### TDD Code Base

Currently very limited -- we're using Mocha and Chai at the moment, and it is currently testing for socket connections. Feel free to add testing across the stack.


## Team

  - __Product Owner__: Leo
  - __Scrum Master__: Tai
  - __Development Team Members__: Sepehr, Shane, Leo, Tai


## Contributing

1. Fork the repo.
1. Clone it to your local computer
1. Cut a namespaced feature branch from master and name it appropriately
1. Make commits and prefix each commit with the type of work you were doing
1. BEFORE PUSHING UP YOUR CHANGES, rebase upstream changes into your branch, fix any potential conflicts, and then push to your fork.
1. Submit a pull request directly to the master
1. Someone else will perform code review to keep codebase clean
1. Fix any errors or issues raised by the reviewer and push the fixes as a single new commit
1. Repeat until the pull request is merged.

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines in detail.
