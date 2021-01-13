const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const name = req.body.name;
                const used = await User.findOne({ "email": email }).exec();
                if (used) return done(null, false, { email: "Email already exists" });
                const user = await User.create({ name, email, password });
                let hash = await bcrypt.hash(user.password, 10);
                user.password = hash;
                user.save();
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ "email": email }).exec();
                if (!user) {
                    return done(null, false, { emailnotfound: "Email not found" });
                }
                const validate = await bcrypt.compare(password, user.password);
                if (!validate) {
                    return done(null, false, { passwordincorrect: "Password incorrect" });
                }
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy({
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }, (jwt_payload, done) => {
        User.findById(jwt_payload._id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    })
);

module.exports = passport;