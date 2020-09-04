module.exports = {
    friendlyName: 'New tabel lecturer',

    description: 'Membuat dosen baru',

    inputs: {
        name: { required: true, type: 'string' },
        password: { required: true, type: 'string' }
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/new-admin'
        }
    },

    fn: async function (inputs, exits) {
        const bcrypt = require('bcrypt');
        const { name, password } = inputs;
        const hashed_password = await bcrypt.hash(password, sails.config.custom.saltRounds);

        const newAdmin = await Admin.create({
            name,
            hashedPassword: hashed_password
        }).fetch();

        return this.res.send(newAdmin);
    }
}