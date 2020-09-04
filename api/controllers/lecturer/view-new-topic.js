module.exports = {

    friendlyName : 'View new topic',

    description : 'Menampilkan form untuk membuat topik baru',

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/lecturer/new-topic',
        }
    },

    fn: async function(inputs,exits) {
        const peminatanList = await Peminatan.find({});
        return exits.success({peminatanList});
    }
}