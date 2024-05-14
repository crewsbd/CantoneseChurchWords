require('dotenv').config();
require('./swagger/autogen');

// Middleware import
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const OauthStrategy = require('passport-github2').Strategy;

// Routes import
const router = require('./routes');

// Error handling
process.on('uncaughtException', (error, origin) => {
    console.log(`${process.stderr.fd}`);
});
process.on('unhandledRejection', (error, origin) => {
    console.log(`Handled rejection`);
});

// Middleware implemented
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ methods: 'GET,POST,PUT,PATCH,DELETE' }));
app.use(bodyParser.json());

// Configure passport
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
    done(null, user);
});
// Set user deserializer
passport.deserializeUser((user, done) => {
    done(null, user);
});
// Set root route
app.get('/', (request, response) => {
    response.send(
        request.session.user !== undefined
            ? `Logged in as ${request.session.user.displayName}`
            : `Logged out`
    );
});

app.use(router);

// Start API
app.listen(process.env.PORT, () => {
    console.log(`API server listening on localhost:${process.env.PORT}`);
});
