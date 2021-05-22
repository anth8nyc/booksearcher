const router = require("express").Router();
const bookRoutes = require("./books");

// Book routes
router.use("/savedbooks", bookRoutes);

module.exports = router;
