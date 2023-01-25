'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //possible issue with belongsTo for this association
      Membership.belongsTo(models.User, {foreignKey: 'userId'})

      //likely wrong, belongsToMany?
      Membership.belongsTo(models.Group, {foreignKey: 'groupId'})
    }
  }
  Membership.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    status: DataTypes.ENUM ("test1", "test2")
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
