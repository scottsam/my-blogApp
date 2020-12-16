const express = require("express");

require("dotenv").config();

const methodOverride = require("method-override");

const expressSession = require("express-session");

const fileUpload = require("express-fileupload");

const handlebars = require("express-handlebars");

const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const paginateHelper = require("express-handlebars-paginate");

const path = require("path");

const connectFlash = require("connect-flash");

const UserRoutes = require("./routes/userRoute");
const commentRoutes = require("./routes/comment");

const auth = require("./middleware/auth");

const mongoose = require("mongoose");

const connectMongo = require("connect-mongo");
const PostRoutes = require("./routes/postRoutes");

const app = express();
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");

  next();
});
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to Database...");
  })
  .catch((err) => console.error("Something went wrong", err));

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: process.env.MYSECRET,
    saveUninitialized: false,
    resave: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.engine(
  "hbs",
  handlebars({
    defaultLayout: "app",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(fileUpload());

app.use(connectFlash());

app.use("*", (req, res, next) => {
  res.locals.userId = req.session.userId;

  next();
});

app.use("/", PostRoutes);
app.use("/", UserRoutes);
app.use("/", commentRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
