module.exports = (sequelize, DataTypes) => {
  const dogNotes = sequelize.define("dogNotes", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return dogNotes;
};
