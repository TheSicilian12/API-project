'use strict';
const {
  Model, Association
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class joinGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      joinGroup.belongsTo(models.Group, {foreignKey: 'eventId'})
      joinGroup.belongsTo(models.User, {foreignKey: 'userId'})

    }
  }
  joinGroup.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // status to track if a user is accepted into a group. Managing a group is not currently a feature
    // so this is not currently necessary
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
