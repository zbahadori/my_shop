import db from "../../utils/db";
import Users from "../../data/users.js";
import User from "../../models/user";

export default async function handler(req, res) {
  await db.connect();

  await User.deleteMany();
  await User.insertMany(Users);

  res.send({ message: "Users Successfully inserted" });
}
