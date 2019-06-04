const bcrypt = require('bcrypt');

module.exports = function(router, database) {

  // Create a new user
  router.post('/', async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password unencrypted
   */
  const login =  function(email, password) {
    return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user.id;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(userId => {
        if (!userId) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = userId;
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });
  
  router.post('/logout', async (req, res) => {
    req.session.userId = null;
    res.send("🤗");
  });

  router.get("/me", async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    database.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }
    
        res.send({user: {name: user.name, email: user.email, id: userId}});
      })
      .catch(e => res.send(e));
  });

  return router;
}