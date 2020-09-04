module.exports = {
    attributes: {
        nik: {
            type: 'number',
            unique: true
        },
        name: {
            type: 'string',
        },
        email: {
            type: 'string',
            allowNull: true
        },
        jfa: {
            columnName: 'jfa_id',
            model: 'jfa'
        },
        kk: {
            columnName: 'kk_id',
            model: 'kk',
        },
        peminatan_id: {
            columnName: 'peminatan_id',
            model: 'peminatan',
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
        lecturer_code: {
            columnName: 'lecturer_code',
            type: 'string'
        },
        role_id: {
            columnName: 'role_id',
            type: 'string'
        }
    },
    customToJSON: function () {
        const { lecturerPublicColumns } = sails.config.custom;
        return _.pick(this, lecturerPublicColumns);
    }
}