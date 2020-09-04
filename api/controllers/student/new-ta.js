module.exports = {
    friendlyName: 'File Ta',

    description: 'Mengupload file ta yang diupload mahasiswa',

    files: ['file_ta'],

    inputs: {

        file_ta: {
            type: 'ref',
            required: true
        }
    },

    exits: {
        badRequest: {
            description: 'Bad request'
        },
        success: {
            outputDescription: 'File uploaded',
            outputType: {
                id: 'number',
                fileTaSrc: 'string'
            }
        }
    },

    fn: async function (inputs, exits) {
        var info = await sails.uploadOne(inputs.file_ta);
        var url = require('url');
        if (!info) {
            throw 'badRequest'
        }

        var newTa = await Ta.create({
            taUrl: url.resolve(sails.config.custom.baseUrl, '/upload-ta/' + this.req.session.studentId),
            taFd: info.fd,
            owner: this.req.session.studentId
        }).fetch();

        return exits.success({
            newTa
        });
    }

}