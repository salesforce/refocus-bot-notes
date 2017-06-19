/**
 * config.js
 * Config file for different deployments - dev, staging, production
 */

module.exports = {
  dev: {
    warRoomUrl: 'http://localhost:3000'
  },
  staging: {
    warRoomUrl: 'https://warroom-staging.herokuapp.com' // fake link at this stage
  },
  production: {
    warRoomUrl: 'https://warroom.herokuapp.com' // fake link at this stage
  }
};