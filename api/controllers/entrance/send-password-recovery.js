const randomstring = require('randomstring');
const url = require('url');
const {mailgunApiKey, mailgunDomain} = sails.config.custom;
const mailgun = require('mailgun-js')({apiKey: mailgunApiKey, domain: mailgunDomain});

module.exports = {
    friendlyName: 'Send password recovery',

    description: 'Mengirim link untuk mengeset password baru, ke email user sesuai nik/nim',

    inputs: {
        userIdVal: {
            required: true,
            type: 'string',
            description: 'Nim atau nik'
        },

        userType: {
            required: true,
            type: 'string',
            isIn: ['lecturer', 'student']
        }
    },
    
    exits: {
        success: {},
        userNotFound: {},
    },

    fn: async function(inputs, exits) {
        const {userType, userIdVal} = inputs
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
        const user = await User.findOne({[userIdKey]: userIdVal});
        if (!user) return exits.userNotFound();
        const token = randomstring.generate();
        const tokenExpireDate = new Date (Date.now() + sails.config.custom.newPasswordTokenTtl);
        await User.updateOne({id: user.id}).set({
            newPasswordToken: token,
            newPasswordTokenExpiresAt: tokenExpireDate
        });
        const tokenLink = url.resolve(sails.config.custom.baseUrl,
            `/password/new?userType=${userType}&token=${encodeURIComponent(token)}`);
        const emailData = {
            from: 'Aplikasi TA 1 <aplikasi_ta1@mailgun.org>',
            to: user.email,
            subject: 'Lupa Password Aplikasi TA 1',
            text: `Klik link dibawah untuk membuat password baru.\n${tokenLink}`
        }
        await mailgun.messages().send(emailData);
        return exits.success();
    }
}