const express = require("express");
const app = express();
require('dotenv').config({ path: __dirname + '/.env' })
const nodemailer = require('nodemailer');
const port = process.env.PORT || 4000;
app.use(express.json());

// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: process.env['USER'],
//         pass: process.env['PASS']
//     }
// });

var transport = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: process.env['MAIL'],
        pass: process.env['PASS']
    },
});

app.get('/', (req, res) => {
    res.send("API is up and running...");
})

app.post('/mail', (req, res) => {
    const data = {
        sender: req.body.name,
        email: req.body.email,
        text: req.body.text
    }
    const message = {
        from: data.email,
        to: process.env['RECEIVE'],
        subject: `portfolio dekhi aayeko - ${data.sender}`,
        text: data.text
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
            res.send("successfully sent");
        }
    });

});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server started at port:", port);
    }
})

module.exports = app;