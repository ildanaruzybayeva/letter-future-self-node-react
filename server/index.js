const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const schedule = require('node-schedule')
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json('Welcome to letterTMFS');
})

const oauth2Client = new OAuth2(
    process.env.clientId, // ClientID
    process.env.clientSecret, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
)

oauth2Client.setCredentials({
    refresh_token: process.env.refreshToken,
});

const accessToken = oauth2Client.getAccessToken()


app.post('/api', async (req, res) => {
    const data = req.body;

    const smtpTransport = await nodemailer.createTransport({
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
        subject: "letterTMFS",
        generateTextFromHTML: true,
        html: `<p>${data.message}</p>
        <p>sent from letterTMFS on ${data.date}</p>`
    };

    const sendMessage = () => {
        smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? res.send(error) : res.send(response);
            smtpTransport.close();
        })
    }

    const usersDate = data.date //date in string '2020-05-12'
    const year = usersDate.slice(0, 4) + 1//add +1 to send next year
    const month = usersDate.slice(5, 7) - 1 //January starts form 0
    const day = usersDate.slice(8, 10)
    const dateOfMessage = new Date(year, month, day, 12, 45, 0);

    schedule.scheduleJob(dateOfMessage, function () {
        sendMessage()
        console.log(`sent at ${dateOfMessage}`)
    });

    console.log(`accepted, message: ${data.message}`)
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server started on ${PORT}`));