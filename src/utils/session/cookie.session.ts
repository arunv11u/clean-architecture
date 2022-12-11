import session from 'express-session';
import { defaultRoutePath } from '../../global-config';
import { StoreSession } from './store.session';

// Take the name and secret from process environment variables instead of static values.
const cookieSessionOptions = session({
    name: "sampleapp_sess", // Naming conventition: appname_meaningfulname
    secret: "temp secret",
    store: new StoreSession(),
    cookie: { path: defaultRoutePath, httpOnly: true, secure: false },
    resave: false,
    saveUninitialized: false
});

export {
    cookieSessionOptions
};