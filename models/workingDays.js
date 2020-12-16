module.exports = (sequelize, DataTypes) => {
  const workingDays = sequelize.define("workingDays", {
    workday: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  return workingDays;
};
