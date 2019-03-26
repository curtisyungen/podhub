const db = require(`../models/index.js`);

/**
 * Class User Controller
 */
class UserController {
  /**
   * create a new user in database
   * @param {*} req
   * @param {*} res
   */
  create(req, res) {
    db.user.findOrCreate({ where: req.body }).then(user => res.json(user));
  }

  /**
   * Get the isFollowing by userId from database
   * @param {*} req
   * @param {*} res
   */
  findIsFollowing(req, res) {
    console.log(req.params.id);

    db.follow
      .findAll({
        where: { followedBy: req.params.id }
      })
      .then(dbfollow => res.json({ count: dbfollow.length }));

    // db.follow
    //   .findAll({
    //     attributes: [
    //       db.sequelize.fn("COUNT", db.sequelize.col("isFollowing")),
    //       "isFollowing"
    //     ],
    //     where: {
    //       followedBy: req.params.id
    //     }
    //   })
    //   .then(dbfollow => res.json(dbfollow));
  }

  /**
   * Get the isFollowed by userId from database
   * @param {*} req
   * @param {*} res
   */
  findFollowedBy(req, res) {
    console.log(req.params.id);
    db.follow
      .findAll({ where: { isFollowing: req.params.id } })
      .then(dbfollow => res.json({ count: dbfollow.length }));
  }

  /**
   * Get the userDetails by userId from database
   * @param {*} req
   * @param {*} res
   */
  findAll(req, res) {
    console.log(req);
    var newUser = {};
    axios
      .get("https://oauth2.googleapis.com/tokeninfo?id_token=" + { params })
      .then(function(response) {
        res.json(response.data);
        newUser = {
          name: response.data.name,
          email: response.data.email,
          id: response.data.sub
        };
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        db.users
          .findOrCreate({
            where: { id: newUser.id },
            defaults: {
              name: newUser.name,
              email: newUser.email
            }
          })
          .spread(user, created)
          .then(function(user) {
            res.end(user);
          });
      });
  }

  /**
   * Update the user
   * @param {*} req
   * @param {*} res
   */
  update(req, res) {
    db.user
      .update(req.body, { where: req.params })
      .then(user => res.json(user));
  }

  /**
   * Remove a user in database
   * @param {*} req
   * @param {*} res
   */
  remove(req, res) {
    db.user.destroy({ where: req.params }).then(user => res.json(user));
  }

  getPosts(req, res) {
    db.post
      .findAll({
        where: {
          postedBy: req.params.id
        }
      })
      .then(function(posts) {
        res.json(posts);
      });
  }
}

module.exports = UserController;
