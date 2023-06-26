const Users = require("../models/users.schema.js");
const { render_template } = require("./html.content.js");

const senderBody = async (requestedMails) => {
  const mailBodys = [];

  for (let i = 0; i < requestedMails.length; i++) {
    const user = await Users.findOne({ dst_id: requestedMails[i].reciver });

    mailBodys.push({
      _id: requestedMails[i].id,
      from: "ajay7yadav95@gmail.com",
      to: user.email,
      subject: requestedMails[i].subject,
      body: render_template(requestedMails[i].body),
    });
  }

  return mailBodys;
};

module.exports = { senderBody };
