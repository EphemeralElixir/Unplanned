<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/15970451/15841590/4985f0ac-2c07-11e6-8ac3-254db6512772.png" >
</p>
---

## Description
> Unplanned is a location-based app that brings strangers together over coffee, food, or beer in the spur-of-the-moment. The catch is, they have to make a decision within 13 seconds of someone asking to meet up, otherwise, they'll lose the chance of meeting that person. The app's goal is to prevent us from overthinking decisions and encourage us to step out of our comfort zone to get to know people who we otherwise would never bother striking up a conversation.

[Live demo the app here](http://192.241.203.99:8000/)

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/15970451/15838035/ee7e741a-2bf0-11e6-996d-17a01c98a81a.png">
</p>

## Table of Contents

1. [Usage](#usage)
1. [Screenshots](#screenshots)
1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    1. [Installing Dependencies](#installing-dependencies)
1. [Understanding the Code Base](#understanding-the-code-base)
    1. [File Structure](#file-structure)
    1. [Where to Begin](#where-to-begin)
1. [The Tech Stack](#tech-stack)
1. [Core Team](#core-team)
1. [Contributing](#contributing)
1. [Licensing](#license)

## Usage

1. Login with Facebook.
1. Click on my profile to edit your contact information and profile
1. Click on a user (represented by a marker) to view their profile
1. Click on "Let's Meet" to send a meeting request
1. Accept or reject a meeting request
1. Enable sharing of location and microphone and video camera

## Screenshots
<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/15970451/15833835/529ddcf6-2bdd-11e6-96c0-383f7f93a0d2.png">

  <img src="https://cloud.githubusercontent.com/assets/15970451/15833836/529e38a4-2bdd-11e6-9268-f2b8b00ed94e.png">

  <img src="https://cloud.githubusercontent.com/assets/15970451/15833837/529f83e4-2bdd-11e6-917c-e29cba66e2f7.png">

  <img src="https://cloud.githubusercontent.com/assets/15970451/15833839/52aae112-2bdd-11e6-82d7-3afbbb161fb2.png">
</p>

## Getting Started

### Prerequisites

Install [Node](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) in your development environment.

You'll also need to set up Facebook, Google Maps, and Peer JS API keys in order to develop for Unplanned:

[Facebook Login Key/APP ID](https://developers.facebook.com/) - Create a new Facebook App and retrieve the App ID. The Facebook callback URL should be set as http://localhost:8000/auth/facebook/callback, and then the APP ID should be set inside webpackEntry.js

![Facebook Callback URL](https://cloud.githubusercontent.com/assets/15970451/15833832/528e0722-2bdd-11e6-846b-4cd0638b2fd2.png)

[Google Maps API Key](https://developers.google.com/maps/documentation/android-api/signup#get_an_api_key_from_the_console_name) - You will need to store your Google Maps API key in apiKeys.js inside of the public folder. apiKey.example.js is provided as a template.

[PeerJS Key](http://peerjs.com/) - For access to Video Calling. You will need to store your peer api key in apiKeys.js inside of the public folder. apiKey.example.js is provided as a template.

Finally, **set up your Sublime Text with the ESLinter using Package Install.** This is crucial to enforce linting convention. 
[Use this guide](https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48#.ne1ikvdg9) to set up your Sublime for linting.

Everything else will be included inside NPM install.

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

Webpack will automatically compile the code using the hotloader mechanism after the server starts; this could take a moment the first time. On completion, visit the localhost server on port 8000:

[http://localhost:8000](http://localhost:8000)

You'll be directed to the Splash page, and the app should be up and running.
## Understanding the Code Base

### File Structure

```sh
EphemeralElixir

├── .github/
|   └── PULL_REQUEST_TEMPLATE
|
├── client/
|   └── components/
|   |   ├── meeting/
|   |   |   ├── Accepted.jsx
|   |   |   ├── CountdownTimer.jsx
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

#### Front-End
Using React, each component view have their own JSX file. If you would like to add a new feature, create a brand new component for it.

- Data is stored, maintained, and dispatched from the redux store
- Most of the socket **event listeners** are stored inside Socket.jsx
- The socket **event emitters** are stored inside of webpackEntry.js
- The components related to the main landing page (splash) are grouped together inside the splash/ directory.
- The components related to the meeting/rejecting requests are grouped inside the meeting/ directory.

#### Server-side
- There are almost no HTTP ajax requests used in this application, so don't go lookin' for them.
- Most of the heavy-duty work is in socket.js
- The server uses sockets as a medium for clients to send and listen for individual requests. You can get really creative since it is very simple and flexible to use
- The server also makes use of Node Mailer (a javascript library) to handle sending emails to users

Server-side is heavily dependent on using websockets, since the app requires real-time data communication, especially with the video chat using Peer JS. We use the lightweight Socket.io JS framework to abstract and provide additionality functionality to work with websockets.

Keep in mind that socket connections are an upgraded version of HTTP, which effectively trims the data being sent back and forth between client and server (to a couple of bytes) and allows real-time communication. After the initial "handshake" between the server and client, the server does not need to wait for a request before sending back any data -- it can push data back and forth, to and from clients whenever it needs, through **event emitters** and **event listeners**.

Example usage:

```javascript

const someHelperFunction = () => {
  const bool = true;
  const num = 10;
  let obj = { me: 'Tai' };
  let arr = [60];

  // Client emitting an event to server, sending any number of arguments over
  // Here, we are sending over some data as defined above
  socket.emit('WriteYourOwnDescriptiveEventHere', "stringyyy", obj, arr, num, bool);

  // FYI this could easily be the server emitting to a client as well.
};

//Invokes the function... it could be a click handler for example
someHelperFunction();


// Server or client listening for this specific event, and then accessing the
// arguments passed in through the callback function
socket.on('WriteYourOwnDescriptiveEventHere', function(str, obj, arr, num, bool) {
  if (bool) {
    obj[str] = arr;
    obj[str].push(num, num + 2);
  }
  console.log(obj[str]); // { me: 'Tai', stringyyy: [60, 10, 12] }
});

```

[Click here](https://scotch.io/tutorials/a-realtime-room-chat-app-using-node-webkit-socket-io-and-mean) for a brief tutorial on sockets

[Nice little cheat sheet for Socket.IO methods](https://gist.github.com/alexpchin/3f257d0bb813e2c8c476)

#### Database Code

This application is not database-heavy
- The schema is userID (unique), name, image url, email, and bio.
- The controller has three functions:
  1. Create and store a new user to the database
  1. Update an existing user's bio if they decide to change it
  1. Check for an existing user in the DB to see it needs to create and save a new one or retrieve

## Testing

The current scope of testing is small. Feel free to add testing across the stack. Bless your heart if you can add testing for the front-end using React Test Utilities/Addons and React JSDOM.

Make sure mongod and nodemon is running, and then run the following code inside terminal:

```sh
mocha specs/socket-server-test.js
```

## Tech Stack

- Node
- Express
- MongoDB
- Mongoose
- Webpack, Webpack Hotloaders
- React, Redux, React Dom, React Google Maps
- Peer JS Video Streaming
- Node Mailer
- Redux
- Eslint
- Babel
- Mocha
- Chai
- SocketIO

## Core Team

  - __Product Owner__: [Leo Adelstein](https://github.com/leoadelstein)
  - __Scrum Master__: [Tai Huynh](https://github.com/anhtaiH)
  - __Development Team Members__: [Sepehr Vakili](https://github.com/sepehrvakili), [Shane Hubbell](https://github.com/shanehubbell), [Leo Adelstein](https://github.com/leoadelstein), [Tai Huynh](https://github.com/anhtaiH)

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

## License

M.I.T
