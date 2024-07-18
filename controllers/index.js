const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./api/userRoutes");
const postRoutes = require("./api/postRoutes");

router.use("/", homeRoutes);
router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);

module.exports = router;
