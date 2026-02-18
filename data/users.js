import bcrypt from "bcryptjs";
const Users = [
  {
    name: "user 1",
    email: "zahra@gmail.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
  {
    name: "user 2",
    email: "zahra2@gmail.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
  {
    name: "user 3",
    email: "zahra3@gmail.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
];
export default Users;
