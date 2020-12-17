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
  const dogTemperments = sequelize.define("dogTemperments", {
    temperment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  return dogTemperments;
};
