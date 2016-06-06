# Project Name: Unplanned

## Description
Unplanned is a location-based app that brings strangers together over coffee, food, or beer in the spur-of-the-moment. The catch is, they have to make a decision within 13 seconds of someone asking to meet up, otherwise, they'll lose the chance of meeting that person.

The app's goal is to prevent us from overthinking decisions and encourage us to step out of our comfort zone to get to know people who we otherwise would never bother striking up a conversation. It steps away from the idea of never talking to strangers, and instead inspires us to open our minds to share in our human experiences, and perhaps, even build meaningful relationships.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements and Tech Stack](#Requirements and Tech Stack)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Unplanned is a Single-Page Application utilizing the Facebook API for authentication, so a single login will bring you straight to the main app.

Once there, a map will have markers on there that you'll be able to click on to review user information, as well as a "Meet" button to request a meeting. If you tap on meet, the user will receive a request to accept or reject the meeting, and a timer will start counting down from 13.

If they accept, contact information will be shared so the users can connect and meet up for coffee/food/beer.

If they reject, the user will receive a rejection notice and then be able to go back to the map to hang out with someone else.

You also have the option to filter if you want coffee, food, or beer so it will match you with people who are down for similar things. You can also make take yourself off the map by flipping the Online/Offline button.

## Prerequisites

Install [Node](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) if you haven't already.

Everything else will be included inside NPM install.

## Requirements and Tech Stack

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

### File Structure and Hierarchy

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
