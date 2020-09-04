module.exports = {
    friendlyName: 'View topic selection',

    description: 'Menampilkan daftar topic-selection pada periode aktif',

    inputs: {
       
    },

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/admin/data-input'}
    },

    fn: async function(input, exits) {
        const kkList = await Kk.find();
        const peminatanList = await Peminatan.find();
        const roleList = await MasterRole.find();
        const jfaList = await Jfa.find();
        return exits.success({kkList, peminatanList,roleList, jfaList});
    }
}