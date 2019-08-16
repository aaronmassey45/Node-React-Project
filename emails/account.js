const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendVerificationEmail = email => {
  sgMail.send({
    to: email,
    from: 'noreply@chowster.glitch.me',
    subject: 'Verify Your Account',
    text:
      "Welcome to Chowster! Please verify your account to access the web app's full capabilities.",
  });
};

const sendAccountRemovedEmail = email => {
  sgMail.send({
    to: email,
    from: 'noreply@chowster.glitch.me',
    subject: 'Your Account Has Been Deleted',
    text:
      "If this wasn't you then sorry buddy, this app doesn't back up deleted accounts.",
  });
};

module.exports = {
  sendVerificationEmail,
  sendAccountRemovedEmail,
};
