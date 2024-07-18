const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const bcrypt = require("bcryptjs");

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push({
      username: `user${i}`,
      email: `user${i}@example.com`,
      password: await bcrypt.hash("password123", 10),
    });
  }
  await User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
  });

  // Create posts and comments
  const posts = [];
  const comments = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 5; j++) {
      posts.push({
        title: `Post ${j} by user${i}`,
        body: `This is post ${j} by user${i}.`,
        user_id: i,
      });
    }
  }
  await Post.bulkCreate(posts, {
    returning: true,
  });

  // Create comments
  const allPosts = await Post.findAll();
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 5; j++) {
      const postId = getRandomInt(allPosts.length);
      comments.push({
        comment_text: `This is comment ${j} by user${i} on post ${postId}.`,
        user_id: i,
        post_id: postId,
      });
    }
  }
  await Comment.bulkCreate(comments, {
    returning: true,
  });

  // Create likes
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 5; j++) {
      const postId = getRandomInt(allPosts.length);
      const post = await Post.findByPk(postId);
      if (post) {
        post.likes += 1;
        await post.save();
      }
    }
  }

  process.exit(0);
};

seedDatabase();
