module.exports = (sequelize, DataTypes) => {
  const WorkingDays = sequelize.define("WorkingDays", {
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
  return WorkingDays;
};
