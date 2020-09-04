module.exports = {
    friendlyName: 'View clo setting',

    description: 'menampilkan pengaturan clo',


    exits: {
        success: {
            viewTemplatePath: 'pages/admin/clo-setting'
        }
    },

    fn: async function (inputs, exits) {
        const cloList = await Clo.find({ isDeleted: false }).populate('plo');
        const cloListSorted = cloList.sort((a, b) => a.plo.id - b.plo.id);
        const ploList = await Plo.find({ isDeleted: false });
        return exits.success({ cloList: cloListSorted, ploList });
    }
}
