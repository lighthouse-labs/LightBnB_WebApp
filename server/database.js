const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their id or email.
 * @param {String} column either 'email', or 'id
 * @param {String} value the value of the email or id 
 */
const getUserWithEmail = function(email) {
  let user;
  for (const userId in users) {
    user = users[userId];
    if (user.email.toLowerCase() === email.toLowerCase()) {
      break;
    } else {
      user = null;
    }
  }
  return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id or email.
 * @param {String} column either 'email', or 'id
 * @param {String} value the value of the email or id 
 */
const getUserWithId = function(id) {
  return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a user to the database
 * @param {{name: string, password: string, email: string}} user
 * @return Promise
 */
const addUser =  function(user) {
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return Promise.resolve(user);
}
exports.addUser = addUser;

/// Properties

const getAllProperties = function(options, limit = 10) {
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
}
exports.getAllProperties = getAllProperties;


/// Reservations

const getAllReservations = function(guest_id) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;


/**
 * A property
 * @typedef {Object} Property
 * @property {int} owner_id
 * @property {string} title
 * @property {string} description
 * @property {string} thumbnail_photo_url
 * @property {string} cover_photo_url
 * @property {string} cost_per_night
 * @property {string} street
 * @property {string} city
 * @property {string} provence
 * @property {string} post_code
 * @property {string} country
 * @property {int} parking_spaces
 * @property {int} number_of_bathrooms
 * @property {int} number_of_bedrooms
 */


/**
 * Add a property to the database
 * @param {Property} property
 * @return  
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
