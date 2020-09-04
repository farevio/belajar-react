module.exports = {
    attributes: {
        nim: {
            type: 'number',
            unique: true
        },
        name: {
            type: 'string'
        },
        email: {
            type: 'string',
        },
        class: {
            type: 'string'
        },
        peminatan: {
            columnName: 'peminatan_id',
            model: 'peminatan'
        },
        kk: {
            columnName: 'kk_id',
            model: 'kk'
        },
        hashedPassword: {
            columnName: 'hashed_password',
            type: 'string',
            allowNull: true
        },
        newPasswordToken: {
            columnName: 'new_password_token',
            type: 'string',
            allowNull: true,
            description: 'Token yang digunakan untuk membuat password baru'
        },
        newPasswordTokenExpiresAt: {
            columnName: 'new_password_token_expires_at',
            type: 'ref',
        },
        ipk: {
            type: 'number',
            columnType: 'DECIMAL'
        },
        groups: {
            collection: 'group',
            through: 'groupstudent',
            via: 'student',
        },
        metlit: {
            columnName: 'metlit_id',
            model: 'metlit'
        },
        ta: {
            columnName: 'ta_id',
            model: 'ta'
        },
        eprt: {
            columnName: 'eprt_id',
            model: 'eprt'
        },
        form: {
            columnName: 'form_id',
            model: 'form'
        }
    },
    customToJSON: function () {
        const { studentPublicColumns } = sails.config.custom;
        return _.pick(this, studentPublicColumns);
    }
}