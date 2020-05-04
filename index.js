const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'abc@gmail.com',
        pass: process.env.PASSWORD || '1234',
    },
});

console.log('start');
let mailOptions = {
    from: 'ildana.ruzybayeva@gmail.com',
    to: 'ildvnv@gmail.com',
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
};
console.log('here');

transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
});
console.log('end');
