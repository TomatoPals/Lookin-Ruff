module.exports = (sequelize, DataTypes) => {
  const stylists = sequelize.define("stylists", {
    stylistName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  return stylists;
};
