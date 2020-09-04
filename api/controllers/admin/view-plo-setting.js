module.exports = {
    friendlyName: 'View plo setting',

    description: 'menampilkan pengaturan plo',


    exits: {
        success: {
            viewTemplatePath: 'pages/admin/plo-setting'
        }
    },

    fn: async function (inputs, exits) {
        const ploList = await Plo.find({ isDeleted: false });
        return exits.success({ ploList });
    }
}