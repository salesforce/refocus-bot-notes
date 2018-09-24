# Notes-Bot
This is the repository for a bot that that can be used to keep notes during incidents. It was designed and developed to be used inside & in conjunction with [Refocus Rooms](https://github.com/salesforce/refocus).

## Features
* Ability for a refocus user to keep notes while in a room.

## Getting Started
These instructions will enable you to have a copy of this project up and running on your local machine for development and testing purposes.

### Prerequisites
* [Node.js](https://nodejs.org/en/)

### Env Variables
Note: If you want to test this locally you will need some environment variables:
* ```API_TOKEN``` - Used for Requests to Refocus. Created in refoucs/tokens/new.

### Running Locally
* Clone this repo
* ```npm install```
* ```npm start```

### Running Tests
While creating some aspects of this project we used Test Driven Developement (TDD). Invoking "npm test" from the command line will run all of these test scripts to ensure everything is working correctly.

## Contributing
If you have any ideas on how this project could be improved, please feel free. The steps involved are:
* Fork the repo on GitHub.
* Clone this project to your machine.
* Commit changes to your own branch.
* Push your work back up to your fork.
* Submit a Pull Request so we can review it!

## Release History
Follows [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning#semver-for-publishers)
* 1.0.0 Basic timeline functionality works.
* 1.0.1 Uses new bdk 1.5.10.
* 1.0.2 Has a display name.
* 1.0.3 Update bdk 1.6.9.
