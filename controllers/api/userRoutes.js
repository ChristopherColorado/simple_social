const router = require("express").Router();
const { User } = require("../../models");

// Register user
router.post("/register", async (req, res) => {
  try {
    console.log("Received registration request:", req.body); // Log request body
    const newUser = await User.create(req.body);
    console.log("User created:", newUser);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser); // Return a JSON response
    });
  } catch (err) {
    console.error("Registration error:", err); // Log the error
    res.status(500).json({ message: "Failed to register", error: err.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    console.log("Received login request:", req.body); // Log request body
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(400).json({ message: "No user found with that email!" });
      return;
    }
    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error("Login error:", err); // Log the error
    res.status(400).json({ message: "Failed to log in", error: err.message });
  }
});

// Logout user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/login"); // Redirect to login page after session is destroyed
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
