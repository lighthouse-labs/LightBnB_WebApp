/**
 * Check if a user exists with a given username and password
 * @param {String} email
 * @param {String} password encrypted
 */
const login = function (email, password) {
  return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
};

module.exports = {
  login
};
