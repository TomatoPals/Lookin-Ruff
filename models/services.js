module.exports = (sequelize, DataTypes) => {
  const services = sequelize.define("services", {
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
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  return services;
};
