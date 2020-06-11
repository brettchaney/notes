import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const sgMail = require('@sendgrid/mail');

admin.initializeApp();

export const sendNoteEmail = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    const note = req.body;
    const msg = {
      to: 'bchaney78@gmail.com',
      from: 'notes@brettchaney.com',
      subject: note.title,
      text: `<h2>${note.title}</h2> ${note.body}`,
      html: `<h2>${note.title}</h2> ${note.body}`,
    };

    sgMail.setApiKey(functions.config().sendgrid.key);

    sgMail
      .send(msg)
      .then(() => {
        res.status(200).send('Mail sent');
      })
      .catch((err: any) => {
        console.error('error:', err);
        res.status(500).send('Mail not sent: ' + err);
      });
  }
});
