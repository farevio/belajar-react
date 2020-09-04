module.exports = {
    friendlyName: 'File EPRT',

    description: 'Mengatur file ta yang diupload mahasiswa',

    files: ['file_form'],

    inputs: {

        file_form: {
            type: 'ref',
            required: true
        },
    },

    exits: {
        badRequest: {
            description: 'Bad request'
        },
        success: {
            viewTemplatePath: 'pages/student/dashboard'
        }
    },

    fn: async function (inputs, exits) {
        var info = await sails.uploadOne(inputs.file_form);
        var url = require('url');
        if (!info) {
            throw 'badRequest'
        }


        var newForm = await Form.create({
            formUrl: url.resolve(sails.config.custom.baseUrl, '/upload-form/' + this.req.session.studentId),
            formFd: info.fd,
            owner: this.req.session.studentId
        }).fetch();

        return exits.success({ newForm });
    }

}