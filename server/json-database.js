const properties = require('../../db/json/properties.json');
const users = require('../../db/json/users.json');

const bcrypt = require('bcrypt');

/// Properties

const getAllPropertiesInCity = async function(properties, city) {
  const filteredProperties = {};
  for (const id in properties) {
    const property = properties[id];
    if (property.city.toLowerCase() === city.toLowerCase()) {
      filteredProperties[id] = property;
    }
  }
  return filteredProperties;
};

const getAllProperties = async function(options, limit) {
  let filteredProperties = properties;
  if (options.city) {
    filteredProperties = await getAllPropertiesInCity(filteredProperties, options.city);
  }
  
  if (limit) {
    const limitedProperties = {};
    let count = 0;
    for (const propertyId in filteredProperties) {
      if (count++ >= limit) {
        continue;
      } else {
        limitedProperties[propertyId] = properties[propertyId];
      }
    }
    filteredProperties = limitedProperties;
  }
  
  const data = {
    total: Object.keys(filteredProperties).length, 
    properties: filteredProperties
  };
  return data;
};
exports.getAllProperties = getAllProperties;

/// Users

const getUser = async function(id) {
  return users[id];
}
exports.getUser = getUser;

const login = async function(email, password) {
  let user;
  for (const userId in users) {
    user = users[userId];
    if (user.email.toLowerCase() === email.toLowerCase()) {
      break;
    } else {
      user = null;
    }
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    return user.id;
  }

  return null;
}
exports.login = login;

const addUser = async function(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return userId;
}
exports.addUser = addUser;