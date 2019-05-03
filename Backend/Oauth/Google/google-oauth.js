const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: '529323352737-97hqrougir4bbksmk1irqfjdsd0cbe4e.apps.googleusercontent.com',
        clientSecret: 'zEK518uSLZP6NiM9dUfK46S6',
        callbackURL: 'http://localhost:3006/api/oauth/google/callback'
    },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};