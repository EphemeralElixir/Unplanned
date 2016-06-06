# Project Name: Unplanned

## Description
Unplanned is a location-based app that brings strangers together over coffee, food, or beer in the spur-of-the-moment. The catch is, they have to make a decision within 13 seconds of someone asking to meet up, otherwise, they'll lose the chance of meeting that person.

The app's goal is to prevent us from overthinking decisions and encourage us to step out of our comfort zone to get to know people who we otherwise would never bother striking up a conversation. It steps away from the idea of never talking to strangers, and instead inspires us to open our minds to share in our human experiences, and perhaps, even build meaningful relationships.



## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
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

## Requirements and Tech Stack

Install Node and MongoDB if you haven't already.
Everything else will be included inside NPM install.

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

http://localhost:8000

The app should be up and running from there.

<!-- View the project roadmap [here](LINK_TO_PROJECT_ISSUES) -->

## Team

  - __Product Owner__: Leo
  - __Scrum Master__: Tai
  - __Development Team Members__: Sepehr, Shane, Leo, Tai


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
