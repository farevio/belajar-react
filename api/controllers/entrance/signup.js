const { mailgunApiKey, mailgunDomain } = sails.config.custom;
const url = require('url');
const randomstring = require('randomstring');
const mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain });

module.exports = {


  friendlyName: 'Signup',


  description: `
      mengirim link verifikasi ke email user yg sesuai nim/nik. 
    `,


  inputs: {
    userType: { required: true, type: 'string' },
    userIdVal: { required: true, type: 'number' },
  },


  exits: {
    success: {
      responseType: 'redirect'
    },
    alreadySignedUp: {},
    userNotFound: {}
  },


  fn: async function (inputs, exits) {
    const { userType, userIdVal } = inputs;
    let User, userIdKey;
    switch (userType) {
      case 'student':
        User = Student;
        userIdKey = 'nim';
        break;
      case 'lecturer':
        User = Lecturer;
        userIdKey = 'nik';  
        break;
      default:
        break;
    }
    const user = await User.findOne({ [userIdKey]: userIdVal });
    if (!user) return exits.userNotFound();
    if (user.hashedPassword) return exits.alreadySignedUp()
    const token = randomstring.generate();
    const tokenExpireDate = new Date(Date.now() + sails.config.custom.newPasswordTokenTtl);
    await User.updateOne({ id: user.id })
      .set({
        newPasswordToken: token,
        newPasswordTokenExpiresAt: tokenExpireDate
      });
    const tokenLink = url.resolve(sails.config.custom.baseUrl,
      `/password/new?userType=${userType}&token=${encodeURIComponent(token)}`);
    const emailData = {
      from: 'Aplikasi TA 1 <aplikasi_ta1@mailgun.org>',
      to: user.email,
      subject: 'Verifikasi akun Aplikasi TA 1',
      text: `Klik link dibawah untuk melanjutkan pendaftaran.\n${tokenLink}`
    }
    await mailgun.messages().send(emailData);
    await mailgun.validate(user.email, function (err, body) {
      if (body && body.is_valid) {
        console.log('bsadasd')
      }
    })
    return exits.success('/');
  }


};
