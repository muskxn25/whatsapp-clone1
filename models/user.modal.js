module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contact_no: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      otp: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 123456,
      },
    },
    {
      timestamps: true,
      freezeTableName: true, // Model tableName will be the same as the model name
    }
  );
  return Users;
};
