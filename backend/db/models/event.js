'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.EventImage, {foreignKey: 'eventId', onDelete: "CASCADE", hooks: true})
      Event.belongsToMany(models.User, {through: models.Attendance})

      Event.belongsTo(models.Venue, {foreignKey: 'venueId'})
      Event.belongsTo(models.Group, {foreignKey: 'groupId'})
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER,
      references: {model: 'Venues'},
      allowNull: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {model: 'Groups'},
      allowNull: false
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.ENUM ("test1", "test2"),
    capacity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
