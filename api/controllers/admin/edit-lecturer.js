module.exports = {
    friendlyName: 'Edit tabel lecturer',

    description: 'Membuat dosen update',

    inputs: {
        id: { required: true, type: 'number' },
        nik: { required: true, type: 'number' },
        name: { required: true, type: 'string' },
        email: { required: true, type: 'string', unique: true, email: true },
        password: { required: true, type: 'string' },
        lecturer_code: { required: true, type: 'string' },
        jfa_id: { required: true, type: 'number' },
        kk_id: { required: true, type: 'number' },
        peminatan_id: { required: true, type: 'number' },
        role_id: { required: true, type: 'number' },
    },

    exits: {
        success: {
            // viewTemplatePath: 'pages/admin/new-lecturer'
        }
    },

    fn: async function (inputs, exits) {
        const bcrypt = require('bcrypt');
        const { nik, name, email, password, lecturer_code, jfa_id, kk_id, peminatan_id, role_id } = inputs;
        const hashed_password = await bcrypt.hash(password, sails.config.custom.saltRounds);

        await Lecturer.update({
            id: inputs.id
        }).set({
            nik,
            name,
            email,
            hashedPassword: hashed_password,
            lecturerCode: lecturer_code,
            jfa: jfa_id,
            kk: kk_id,
            peminatan: peminatan_id,
            role: role_id
        })

        return exits.success();
    }
}