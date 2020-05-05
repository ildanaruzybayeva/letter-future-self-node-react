const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to my api');
})


const oauth2Client = new OAuth2(
    process.env.clientId, // ClientID
    process.env.clientSecret, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.refreshToken,
});
const accessToken = oauth2Client.getAccessToken()


app.post('/api', (req, res) => {
    const data = req.body;

    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "ildana.ruzybayeva@gmail.com",
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
            refreshToken: process.env.refreshToken,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: "ildana.ruzybayeva@gmail.com",
        to: `${data.email}`,
        subject: "hello ily",
        generateTextFromHTML: true,
        html: `
        <p>${data.email}</p>
        <p>${data.message}</p>`
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? res.send(error) : res.send(response);
        smtpTransport.close();
    });
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server started on ${PORT}`));