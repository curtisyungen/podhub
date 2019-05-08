const path = require("path");
const router = require("express").Router();
const userRoutes = require("./userRoute");
const postRoutes = require("./postRoute");
const favoriteRoutes = require("./favoriteRoute");
const commentRoute = require("./commentRoute");

// User routes
router.use("/users", userRoutes);

// Post Routes
router.use("/posts", postRoutes);

// Favorite Routes
router.use("/favorites", favoriteRoutes);

// Favorite Routes
router.use("/comments", commentRoute);

// For anything else, render the html page
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
