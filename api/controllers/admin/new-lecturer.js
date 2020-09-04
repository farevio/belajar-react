module.exports = {
    friendlyName: 'New tabel lecturer',

    description: 'Membuat dosen baru',

    inputs: {
        nik: { required: true, type: 'number' },
        name: { required: true, type: 'string' },
        email: { required: true, type: 'string', unique: true, email: true },
        password: { required: true, type: 'string' },
        lecturer_code: { required: true, type: 'string' },
        jfa_id: { required: true, type: 'number' },
        kk_id: { required: true, type: 'number' },
        peminatanId: { required: true, type: 'number' },
        role_id: { required: true, type: 'ref' },
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/daftar-dosen'
        },
        failed: {}
    },

    fn: async function (inputs, exits) {
        const bcrypt = require('bcrypt');
        const { nik, name, email, password, lecturer_code, jfa_id, kk_id, peminatanId, role_id } = inputs;
        const hashed_password = await bcrypt.hash(password, sails.config.custom.saltRounds);
        const roleString = role_id.toString();

        const newLecturer = await Lecturer.create({
            nik,
            name,
            email,
            hashedPassword: hashed_password,
            lecturerCode: lecturer_code,
            jfa: jfa_id,
            kk: kk_id,
            peminatan: peminatanId,
            role: roleString
        }).fetch().intercept((err)=>{
            // Return a modified error here (or a special exit signal)
            // and .create() will throw that instead
            err.message = 'Uh oh: '+err.message;
            console.log(err);
           });

        if(newLecturer.id){
            
            return exits.success();
        }
        else return exits.failed();
    }
}