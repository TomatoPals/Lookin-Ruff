module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stylist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Appointment;
};
