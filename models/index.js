const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Friend = require("./Friend");

// User-Post association
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

// User-Comment association
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Post-Comment association
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// User-Friend association (self-referential many-to-many)
User.belongsToMany(User, {
  through: Friend,
  as: "friends",
  foreignKey: "user_id",
  otherKey: "friend_id",
});

module.exports = { User, Post, Comment, Friend };
