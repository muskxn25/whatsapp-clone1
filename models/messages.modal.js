module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define(
    "chat",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      sender_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      receiver_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      freezeTableName: true, // Model tableName will be the same as the model name
    }
  );
  return Chat;
};
