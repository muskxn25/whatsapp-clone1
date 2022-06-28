const db = require("../models");

const User = db.user_model;

const login = async (req, res) => {
  let { contact_no, otp } = req.body;

  if (!contact_no || !otp) {
    return res.status(400).json({
      message: "Please provide phone number and otp",
    });
  }

  try {
    // check if user exists if not then create a new user

    let user = await User.findOne({
      where: {
        contact_no,
        otp: otp,
      },
    });

    // if not found then create a new user

    if (!user) {
      user = await User.create({
        contact_no,
        otp,
      });

      // return user details

      return res.status(200).json({
        message: "User logged in successfully",
        user,
      });
    }
    let token = {
      id: user.id,
      contact_no: user.contact_no,
    };

    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  login,
};
