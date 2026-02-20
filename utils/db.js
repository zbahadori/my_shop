import mongoose from "mongoose";

async function connect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shopping");
  console.log("MongoDB Connected!");
}

const disconnect = async () => {
  // اگر در محیط production نیستید، اتصال را باز نگه دارید
  if (process.env.NODE_ENV === "production") {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

function convertToObj(doc) {
  doc._id = doc._id.toString();
  return doc;
}

const db = { connect, disconnect, convertToObj };
export default db;
