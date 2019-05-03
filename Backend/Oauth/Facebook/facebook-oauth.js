const FacebookStrategy = require('passport-facebook').Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new FacebookStrategy({
            clientID:'1156475391190922',
            clientSecret:'53256ea2edb5da7a6c4c9fc4a5af84a4',
            callbackURL: 'http://localhost:3006/api/oauth/facebook/callback',
            profileFields: ['id', 'email', 'displayName'] 
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};

