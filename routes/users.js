const { login } = require("../controllers/users");

const router = require("express").Router();

router.post("/login", login);
router.get("/login", (req, res) => {
  res.send("login");
});

module.exports = router;
