const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// middle ware
app.use(cors());
app.use(express.json());
// middle ware
// mongodbConnect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4slfm2g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function dbConnect() {
  await client.connect();
  console.log(`dbConnect`);
}
dbConnect().catch((error) => {
  const message = error.message;
  const name = error.name;
  console.log(name, message);
});
// mongodbConnect

// create api
app.get("/", async (req, res) => {
  try {
    res.send({ success: true, message: `Server Is Ready For This Program` });
  } catch (error) {
    res.send({ success: false, error: `Fixed Error : ${error}` });
  }
});
// create api
// All Collection Name Convention
const appointmentCollection = client
  .db("Appointment-Doctors")
  .collection("Appointment-Data");
// All Collection Name Convention
// All APi Create
app.get("/appointment", async (req, res) => {
  try {
    const allAppointment = await appointmentCollection.find({}).toArray();
    if (allAppointment) {
      res.send({ success: true, data: allAppointment });
    }
  } catch (error) {
    res.send({ success: false, error: `Data is not found ${error}` });
  }
});
// All APi Create
// Listen
app.listen(port, () => console.log(`server is running port ${port}`));
// Listen
