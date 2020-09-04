const bcrypt = require('bcrypt');

module.exports = {
    friendlyName: 'Change password',

    description: 'Mengganti password user',

    inputs: {
        oldPassword: {required: true, type: 'string'},
        newPassword: {required: true, type: 'string'}
    },

    exits: {
        success: {},
        incorrectOldPassword: {}
    },

    fn: async function (inputs, exits) {
        let User, userId;
        if (this.req.session.studentId) {
            User = Student;
            userId = this.req.session.studentId;
        } else if (this.req.session.lecturerId) {
            User = Lecturer;
            userId = this.req.session.lecturerId;
        } else if (this.req.session.adminId) {
            User = Admin;
            userId = this.req.session.adminId;
        }
        const user = await User.findOne({id: userId});
        const isPasswordMatch = await bcrypt.compare(inputs.oldPassword, user.hashedPassword);
        if (!isPasswordMatch) return exits.incorrectOldPassword();
        const newHashedPassword = await bcrypt.hash(inputs.newPassword, sails.config.custom.saltRounds);
        await User.updateOne({id: userId}).set({hashedPassword: newHashedPassword});
        return exits.success();
    }
}