const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/google/callback',
    passReqToCallback: true,
    scope: ['email', 'profile']
  }, (req, accessToken, refreshToken, profile, done) => {
    return done(null, profile)
  }
))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))