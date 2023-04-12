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
      Event.belongsToMany(models.User, {through: models.Attendance, foreignKey: 'groupId', otherKey: 'userId'})

      Event.hasMany(models.Attendance, {foreignKey: "eventId", onDelete: "CASCADE", hooks: true})


      Event.belongsTo(models.Venue, {foreignKey: 'venueId'})
      Event.belongsTo(models.Group, {foreignKey: 'groupId'})
    }
  }
  Event.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
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
    type: {
      type: DataTypes.ENUM ("Online", "In Person"),
      defaultValue: "In Person"
    },
    capacity: {
     type: DataTypes.INTEGER,
     allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0
      }
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
