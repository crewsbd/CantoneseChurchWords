require('dotenv').config();
// require('./swagger/autogen'); // Gets out of sync

// Middleware import
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const OauthStrategy = require('passport-github2').Strategy;
const mongoose = require('./database');

// Routes import
const router = require('./routes');

// Error handling
process.on('uncaughtException', (error, origin) => {
    console.log(`${process.stderr.fd}`);
});
process.on('unhandledRejection', (error, origin) => {
    console.log(`Handled rejection`);
});

// Session store
console.log('Initializing session store');
const sessionStore = new SessionStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
});
console.log('session error handling');
sessionStore.on('error', () => {
    console.error('Session store error', error);
});

// Middleware implemented
app.use(cors({ methods: 'GET,POST,PUT,PATCH,DELETE' }));
app.use(bodyParser.json());
console.log('Setting up session.');
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
    })
);

// Configure passport
console.log('Configure passport');
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new OauthStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);
// Set user serializer
passport.serializeUser((user, done) => {
    done(null, user); // Is this to put a user in a DB?
});
// Set user deserializer
passport.deserializeUser((user, done) => {
    done(null, user);
});

// All routes are here.
app.use(router);

// Start API
app.listen(process.env.PORT, () => {
    console.log(`API server listening on localhost:${process.env.PORT}`);
});
