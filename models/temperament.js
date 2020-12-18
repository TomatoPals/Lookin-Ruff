module.exports = (sequelize, DataTypes) => {
  const dogTemperaments = sequelize.define(
    "dogTemperaments",
    {
      temperament: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  );
  return dogTemperaments;
};
