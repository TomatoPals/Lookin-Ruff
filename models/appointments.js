module.exports = (sequelize, DataTypes) => {
  const appointments = sequelize.define("appointments", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stylistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    appointmentDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    appointmentTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return appointments;
};
