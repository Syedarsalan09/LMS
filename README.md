# Library-Management-System
This is MERN full stack Library Management System application which have multiple functionalities like issuing,returning book and fine calculation student/user panel admin panel validations etc are included in this Library app

### Password reset email configuration

The server must have `CLIENT_URL`, `EMAIL_USER`, and `EMAIL_PASS` set in `server/.env` for password reset emails to work. `CLIENT_URL` should be the URL where the client is hosted (for local development, typically `http://localhost:5173`). The email sender currently uses Gmail; for `EMAIL_PASS`, use a Google App Password rather than the account's normal password. If Gmail reports an authentication error, verify these values and generate a new App Password if needed.

On the Forgot Password page, enter the email address used for the account. Students should enter their registered email; the administrator should enter `ADMIN_EMAIL` from `server/.env` (or `admin@library.com` if it is not set). The reset link is valid for 15 minutes and can only be used once. A successfully reset administrator password is saved as the account password; `ADMIN_PASSWORD` is only used when first creating the admin account and does not overwrite a later password reset.

For local development only, set `NODE_ENV=development` in `server/.env`. If email delivery fails in this mode, the Forgot Password page displays a one-time reset link directly. Do not use development mode in production; production password resets must be delivered through a correctly configured email service.
