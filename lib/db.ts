import mongoose from "mongoose";

type TConnection = {
  isConnected: 0 | 1 | 2 | 3 | 99;
};
const connection: TConnection = {
  isConnected: 0,
};

async function ConnectDB() {
  if (connection.isConnected > 0) {
    console.log("Already connected");
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection to db");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.ECOM_MONGODB_URL as string);
  console.log("New connection to db");
  connection.isConnected = db.connections[0].readyState;
}

async function DisconnectDB() {
  if (connection.isConnected > 0) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = 0;
    } else {
      console.log("not disconnecting from db");
    }
  }
}

const db = { ConnectDB, DisconnectDB };
export default db;
