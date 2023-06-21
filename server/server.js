const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000; // If the port needs to change we can change it by setting an env to PORT or it will default to 8000
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const originenv = process.env.CORS_ORIGIN || "http://localhost:3000"; // If we deploy we can clarify the url, otherwise it will default to localhost:3000

require('dotenv').config();
require("./config/mongoose.config");

app.use(cookieParser());
app.use(cors({credentials: true, origin: originenv}));
app.use(express.json(), express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/images", express.static("images"));

require("./routes/user.routes")(app);
require("./routes/character.routes")(app);
require("./routes/documentation.routes")(app);
require("./routes/openAi.routes")(app);


app.listen(port, () => console.log(`Listening on port: ${port}`) );