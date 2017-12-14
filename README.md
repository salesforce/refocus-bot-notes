# Refocus Bot Scaffold

## Overview
This repo is a scaffold project to help develop bots for refocus rooms using the Refocus Bot Development Kit (BDK) (/lib/refocus-bdk.js). Refocus rooms, described here (https://salesforce.quip.com/OeDwAuLM0tQA), are collaberative channels in which people and bots interact to resolve service issues. So this project is to help develop bots for Refocus that will have ablity to interact with external APIs and the Refocus rooms.

## Background
### Terminology
**Refocus** - Refocus is a visualization platform for the status and health of anything you want to monitor. If you care about how your service is performing right now.

**Incident** - While there alot of terms for incident, generally when its used here we mean and non-optimal status that needs people to resolve it.

**Bot** - A web app that is created to interact with some set of services and people to help resolve incidents.

**Room** - Rooms are models in Refocus, which hold references to all data needed to coordinate a incident response. Rooms hold information like name of incidents, what bots are needed, and what settings should we use when intializing an incident.

**Room Settings** - This is the intial dataset and the general configuration tools a room has to interact with a bot.

**Room Type** - Stores default room configuration for future use

**Bot Data** - Data stored in refocus that is tightly coupled to a room and bot. This data is used to sync state of bots between users and managed data needed to resolve incidents.

**Bot UI** - The visual part of the web app bots create that are stored in Refocus and used in rooms. Generally the UI should only be in charge of rendering UI based on changes to bot data, actions or events. Akin to visualforce in Salesforce.

**Bot Server** - A webserver running that recieve request from Bot UI through Refocus. These requests are perform logic that cant be done from refocus itself

**Bot Action** - These are function calls made from bot UI to bot server to perform some external or internal logic. The response of that logic can be communicated to Bot UIs for rendering.

**Bot Events** - Any events that is done on Refocus or activity that a bot decides to log.

**Shared Context** - Shared Context is a room setting (denoted sharedContext) that syncs one bot data to another bot data. This is a way to allow bots to get data from other bots without.

### Repo Structure
_**/**_

--> _.gitignore_: Files to ignore on git commits
  --> _config.js_: Some basic configurations
  --> _index.js_: Bot server listeners and logic are identified here
  --> _package.json_: Bot static information
  --> _README.md_: Project explainations
  --> _webpack.config.js_: Webpack configurations
  --> _**/lib**_: This is where helper files should go
  --> _**/web**_: Bot UI development done here
  -----> _**/components**_: React UI elements stored here
  --------> _App.jsx_: Entry point for Bot UI
  -----> _**/dist**_: Generated bundle that will be uploaded to Refocus
  -----> _index.html_: Basic web structure for Bot UI
  -----> _index.js_: Bot UI dynamic logic

## Getting Started
### Test Bot Locally without Refocus
1.  Clone this repo
2.	Add any server side code you want to bot.js
3.	Add any UI side code to web/index.js
4.	```npm login``` - You need to login to get salesforce/bdk
5.	```npm start```
6.	Test locally (default port 5000)

### Test Bot Locally with Refocus
1.  Clone this repo
2.	Add any server side code you want to bot.js
3.	Add any UI side code to web/index.js
4.	Install and run Refocus https://salesforce.github.io/refocus/docs/04-quickstartlocal.html
5.	Create a token https://salesforce.github.io/refocus/docs/10-security.html
6.	Add token to Bot enviroment variables -  ```export TOKEN={{UI TOKEN from Step 5}}```
7.	```npm login``` - You need to login to get salesforce/bdk
8.	```npm start```
9.	If it is your first install you will be returned a ```Authorization Token``` for sockets
10.	Add authorization token to Bot enviroment variables -  ```export AUTH_TOKEN={{UI TOKEN from Step 9}}```
11.	```npm start```
12. Create a RoomType in Refoucs with your Bot added
13. Create a Room in Refoucs with your new RoomType
14.	Go to ```https://host:port/rooms/``` and open your new room

###  Using Shared Context
Under Construction

## Extension
### Examples Bots
Communication Bot - https://git.soma.salesforce.com/Refocus-Bots/Communications-Bot
Salesforce Case Bot - https://git.soma.salesforce.com/Refocus-Bots/Salesforce-Object-Bot

### Contributing
If you have any ideas on how this project could be improved, please feel free. The steps involved are:
* Fork the repo on GitHub.
* Clone this project to your machine.
* Commit changes to your own branch.
* Push your work back up to your fork.
* Submit a Pull Request so we can review it!
