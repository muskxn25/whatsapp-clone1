const { saveChat, getChat } = require("../controllers/chats");

const router = require("express").Router();

router.get("/", getChat);
router.post("/", saveChat);

module.exports = router;
