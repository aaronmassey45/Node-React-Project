const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = (email, username, token) => {
  sgMail.send({
    to: email,
    from: 'noreply@chowster.glitch.me',
    subject: 'Verify Your Account',
    html: `Welcome to Chowster! Click on this <a href="${process.env.BASE_URL}/verification?username=${username}&token=${token}">link</a> to verify your account.`,
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
