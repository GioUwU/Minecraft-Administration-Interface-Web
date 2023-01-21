# REST API Minecraft Administration Web Interface

This is a bare-bones example of a Sinatra application providing a REST
API to a DataMapper-backed model.

The entire application is contained within the `index.js` file.

`.env` contains the environment variables.


## Install

    npm install

## Run the app

    npm start 

# REST API

The REST API is a Minecraft Administration Web Interface.

## Endpoints list

### POST /api/login
### POST /api/logout
### POST /api/register

### GET /api/user
### GET /api/getAllUsers
### DELETE /api/deleteUser

### GET /api/getAllTimes
### GET /api/getAllRules
### POST /api/newRule
### POST /api/newTime

### POST /api/registerSancion
### GET /api/getAllHistory
### GET /api/getUserNameHistory/:nickname
### GET /api/getHistoryByFaction/:faction
### GET /api/getHistoryBiId/:id
### DELETE /api/deleteHistory/:id
### POST /api/uploadProofs/:id
### GET /api/proofs/:id
### GET /proofs/:name

### POST /api/authoRizeSanction/:id
### POST /api/updateAvatar/:id

### GET /avatar/:id
