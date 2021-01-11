require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const passport = require("./services/passport");
const authRoute = require("./routes/authRouter");
const imgRoute = require("./routes/imgRouter");
const userRoute = require("./routes/userRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongoose connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("connected to mongo database"))
    .catch((error) => console.error(error));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', passport.authenticate('jwt', { session: false }), imgRoute);
app.use('/api/user', passport.authenticate('jwt', { session: false }), userRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => console.log(`listening on port : ${PORT}`));