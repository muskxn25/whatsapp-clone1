const { Sequelize } = require("../models");
const db = require("../models");

const Chat = db.chat_model;

const Op = Sequelize.Op;

const saveChat = async (req, res) => {
  let { sender_id, receiver_id, message } = req.body;

  if (!sender_id || !receiver_id || !message) {
    return res.status(400).json({
      message: "Please provide sender_id, receiver_id and message",
    });
  }

  try {
    let chat = await Chat.create({
      sender_id,
      receiver_id,
      message,
    });

    return res.status(200).json({
      message: "Chat saved successfully",
      chat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getChat = async (req, res) => {
  let { sender_id, receiver_id } = req.body;

  if (!sender_id || !receiver_id) {
    return res.status(400).json({
      message: "Please provide sender_id and receiver_id",
    });
  }

  try {
    let chat = await Chat.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ sender_id }, { receiver_id }],
          },
          {
            [Op.and]: [{ sender_id: receiver_id }, { receiver_id: sender_id }],
          },
        ],
      },
    });

    return res.status(200).json({
      message: "Chat fetched successfully",
      chat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  saveChat,
  getChat,
};
