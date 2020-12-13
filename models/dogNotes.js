module.exports = (sequelize, DataTypes) => {
  const DogNotes = sequelize.define("DogNotes", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return DogNotes;
};
