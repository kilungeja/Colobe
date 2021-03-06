const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { isAuth } = require("./middlewares/authMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@colobes-shard-00-00-jjoyn.mongodb.net:27017,colobes-shard-00-01-jjoyn.mongodb.net:27017,colobes-shard-00-02-jjoyn.mongodb.net:27017/colobes?ssl=true&replicaSet=Colobes-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Registering middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", isAuth, require("./routes/dashboardRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "dist", "colobe", "index.html"))
  );
}

// database connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
