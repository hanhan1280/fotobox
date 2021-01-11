const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
    passport.authenticate("signup", function (err, user, info) {
        if (err || !user) {
            return res.status(400).json({ email: "Email already exists" });
        }
        return res.json(user);
    })(req, res, next);
});

router.post("/login", (req, res, next) => {
    passport.authenticate("login", function (err, user, info) {
        if (err) {
            return res.status(400).json(err);
        }
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        req.logIn(user, { session: false }, function (err) {
            if (err) {
                return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
            const body = { _id: user._id, name: user.name, email: user.email };
            const token = jwt.sign(body, 'TOP_SECRET');

            return res.json({
                success: true,
                token: "Bearer " + token
            });
        });
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    req.logout();
    return res.status(200).json({ msg: "Success Logout" });
})

module.exports = router;