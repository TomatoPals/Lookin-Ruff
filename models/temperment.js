

module.exports = function(sequelize, DataTypes) {
  const Temperment = sequelize.define("Temperment", {
    temperment: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
    return Temperment;
};
