// module.exports = function(sequelize, DataTypes) {
//   const dog_temperment = sequelize.define("dog_temperment", {
//     temperment: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//   });
//     return dog_temperment;
// };
module.exports = (sequelize, DataTypes) => {
  const dogTemperment = sequelize.define(
    "dogTemperment",
    {
      temperment: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { freezeTableName: true }
  );
  return dogTemperment;
};
