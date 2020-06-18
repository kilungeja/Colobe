const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@colobes-shard-00-00-jjoyn.mongodb.net:27017,colobes-shard-00-01-jjoyn.mongodb.net:27017,colobes-shard-00-02-jjoyn.mongodb.net:27017/colobes?ssl=true&replicaSet=Colobes-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Registering middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

// database connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server started and listening on PORT ${PORT}`);
});
