module.exports = (sequelize, DataTypes) => {
  const Stylist = sequelize.define(
    "Stylist",
    {
      stylistName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { freezeTableName: true }
  );
  return Stylist;
};
