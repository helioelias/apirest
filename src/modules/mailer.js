const path = require('path');

const nodemailer = require('nodemailer');

const hbs = require('nodemailer-express-handlebars'); //utilizacao de templates para e-mail

const { host, port, user, pass} = require('../config/mail.json');

//usando sintaxe do ES6 para atribuir os valores abaixo
const transport = nodemailer.createTransport({
  host,
  port,
  auth: {user, pass },
});

//define o uso do template para envio de e-mails
transport.use('compile', hbs({
	viewEngine: 'handlebars',
	viewPath: path.resolve('./src/resources/mail/'),
	extName: '.html',
}));

module.exports = transport;