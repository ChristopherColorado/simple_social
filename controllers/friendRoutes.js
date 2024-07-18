const router = require("express").Router();
const { Friend, User } = require("../models");
const withAuth = require("../utils/auth");

// GET all friends for a user
router.get("/", withAuth, async (req, res) => {
  try {
    const friendData = await Friend.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          as: "friends",
          attributes: ["username"],
        },
      ],
    });

    const friends = friendData.map((friend) => friend.get({ plain: true }));
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST add a new friend
router.post("/", withAuth, async (req, res) => {
  try {
    const newFriend = await Friend.create({
      user_id: req.session.user_id,
      friend_id: req.body.friend_id,
    });

    res.status(200).json(newFriend);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a friend
router.delete("/:friend_id", withAuth, async (req, res) => {
  try {
    const friendData = await Friend.destroy({
      where: {
        user_id: req.session.user_id,
        friend_id: req.params.friend_id,
      },
    });

    if (!friendData) {
      res.status(404).json({ message: "No friend found with this id!" });
      return;
    }

    res.status(200).json(friendData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
