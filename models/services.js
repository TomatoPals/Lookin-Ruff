module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define("Services", {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: null
    },
    duration: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  });
  return Services;
};
