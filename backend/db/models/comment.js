'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Group.belongsToMany(models.User, {through: models.Membership, foreignKey: 'groupId', otherKey: 'userId'})

      // Group.hasMany(models.Membership, {foreignKey: "groupId", onDelete: "CASCADE", hooks: true})

      // Group.hasMany(models.Venue, {foreignKey: 'groupId', onDelete: "CASCADE", hooks: true})
      // Group.belongsTo(models.User, {foreignKey: 'organizerId'})
      // Group.hasMany(models.GroupImage, {foreignKey: 'groupId', onDelete: "CASCADE", hooks: true})
      // Group.hasMany(models.Event, {foreignKey: 'groupId', onDelete: "CASCADE", hooks: true})

      Comment.belongsTo(models.Event, {foreignKey: 'eventId'})
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {model: "Users"},
      allowNull: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {model: "Events"},
      allowNull: true
    },
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
