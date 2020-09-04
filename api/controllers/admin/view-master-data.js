module.exports = {
    friendlyName: 'View master data',

    description: 'Menampilkan semua master data',

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/admin/master-data'
        },
    },
    fn: async function (input, exits) {
        const kkList = await Kk.find();
        const peminatanList = await Peminatan.find();
        const roleList = await MasterRole.find();
        const jfaList = await Jfa.find();
        return exits.success({peminatanList,jfaList,kkList,roleList});
    }
}
