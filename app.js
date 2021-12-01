//core modules
const path = require("path");

//3rd party modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61a6f8d252a4926e52e83db5")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://root:mongo123@cluster-learnings.fjnwf.mongodb.net/ecommerce-app?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "Admin",
          email: "admin@xyz.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log("CONNECTED SUCCESSFULLY!!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
