module.exports = (sequelize, DataTypes) => {
  const dogTemperament = sequelize.define(
    "dogTemperament",
    {
      temperament: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { freezeTableName: true }
  );
  return dogTemperament;
};
