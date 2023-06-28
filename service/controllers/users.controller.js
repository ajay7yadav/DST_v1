const User = require("../models/users.schema.js");
const Notification = require("../models/notification.js");
const generateDST_ID = require("../utils/auto_ids.js");

// const { Users } = require('../utils/mongodb.utils.js');

exports.insertUser = async (req, res) => {
  const body = req.body;
  try {
    const generateDST = await generateDST_ID.dst_Id();
    body.dst_id = generateDST;
    const check = await User.findOne({ email: body.email });
    if (check)
      return res
        .status(400)
        .send({ status: false, message: "email already exist !", data: 1 });

    await User.create(body);

    res.status(201).send({
      status: true,
      message: "user created",
    });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};

exports.getUser = async (req, res) => {
  const body = req.body;
  console.log("body ", body);
  try {
    if (!body.email || !body.password) {
      return res.status(400).send({
        status: false,
        message: "email / password field missing",
        data: 0,
      });
    }

    const user = await User.findOne({ email: body.email });
    console.log("users ", user);

    if (!user)
      return res
        .status(404)
        .send({ status: false, message: "email not found !", data: 1 });
    else if (user.password !== body.password)
      return res
        .status(404)
        .send({ status: false, message: "password not matched", data: 2 });
    else
      res.status(200).send({
        status: true,
        data: user,
      });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};

exports.forgetPass = async (req, res) => {
  const body = req.body;
  try {
    const mail = await User.findOne({ email: body.email });

    if (!mail)
      return res
        .status(404)
        .send({ status: false, message: "email not found !", data: 1 });

    const OTP = await generateDST_ID.otp();
    mail.otp = OTP;
    mail.otpTime = Date.now();
    await mail.save();

    const notifyBody = {
      sender: "DSTADMIN",
      reciver: mail.dst_id,
      subject: "DST Todo",
      body: `Your OTP ${OTP} for forget your account password`,
    };

    await Notification.create(notifyBody);

    res.status(201).send({
      status: true,
      data: mail.dst_id,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.matchOtp = async (req, res) => {
  const dst_id = req.query.dst_id;
  const otp = req.query.otp;

  try {
    const user = await User.findOne({ dst_id: dst_id, otp: otp });

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "OTP not matched ",
      });
    }

    const futureDateTime = new Date(user.otpTime);
    futureDateTime.setMinutes(futureDateTime.getMinutes() + 5); // Add 5 minutes to the future time

    const currentDateTime = new Date();

    if (currentDateTime > futureDateTime) {
      return res.status(404).send({
        status: false,
        message: "OTP expire re-send ",
      });
    }

    return res.status(200).send({
      status: true,
      message: "matched",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const body = req.body;
  const dst_id = req.query.dst_id;

  try {

    if (body.newpass1 !== body.newpass2) {
      return res.status(404).send({
        status: false,
        message: "both password not matched",
        data: 2,
      });
    }

    await User.updateOne({dst_id : dst_id}, {$set : {password : body.newpass1}});

    return res.status(201).send({
      status : true,
      message : 'password updated'
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  
};

exports.userProfile = async (req, res) => {
  const id = req.query.dst_id;

  try {
    const user = await User.findOne({ dst_id : id });

    if (!user)
      return res
        .status(404)
        .send({ status: false, message: "user not found !", data: 1 });
    else
      res.status(200).send({
        status: true,
        data: user,
      });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};

exports.updateProfile = async ( req, res) =>{
  const body = req.body;
  const user_id = req.query.dst_id;
  try {
    console.log("Body ",body);
    await User.updateOne({dst_id : user_id}, {$set : body});
    res.status(201).send({
      status : true,
      message : 'profile updated !'
    })
  } catch (err) {
    res.status(500).send({ message: `${err.message}` });
  }
}