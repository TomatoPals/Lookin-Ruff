module.exports = (sequelize, DataTypes) => {
  const dogBreeds = sequelize.define("dogBreeds", {
    breedName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breedTypeId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    breedOrigin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breedImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    breedPdf: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  return dogBreeds;
};
