'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venue.hasMany(models.Event, {foreignKey: 'venueId', onDelete: "CASCADE", hooks: true})

      // this association may be wrong, possibly belongsToMany
      Venue.belongsTo(models.Group, {foreignKey: 'groupId'})
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      references: {model: 'Groups'},
      allowNull: false
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
     type: DataTypes.DECIMAL,
     validate: {
      min: -180,
      max: 180
     }
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};
