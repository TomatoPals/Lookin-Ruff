module.exports = (sequelize, DataTypes) => {
  const Stylist = sequelize.define("Stylist", {
    stylistName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Stylist;
};
