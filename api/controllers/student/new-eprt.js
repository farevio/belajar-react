module.exports = {
    friendlyName: 'File EPRT',

    description: 'Mengatur file ta yang diupload mahasiswa',

    files: ['file_eprt'],

    inputs: {

        file_eprt: {
            type: 'ref',
            required: true
        },

        score: {
            type: 'number',
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
        var info = await sails.uploadOne(inputs.file_eprt);
        var url = require('url');
        const score = inputs.score;
        if (!info) {
            throw 'badRequest'
        }


        var newEprt = await Eprt.create({
            score: score,
            eprtUrl: url.resolve(sails.config.custom.baseUrl, '/upload-eprt/' + this.req.session.studentId),
            eprtFd: info.fd,
            owner: this.req.session.studentId
        }).fetch();
        return exits.success({ newEprt });
    }

}