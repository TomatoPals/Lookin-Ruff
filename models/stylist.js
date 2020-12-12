module.exports = (sequelize, DataTypes) => {
  const Stylist = sequelize.define("Stylist", {
    stylist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Stylist;
};
