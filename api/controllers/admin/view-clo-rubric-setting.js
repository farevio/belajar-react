module.exports = {
    friendlyName: 'View clo rubric setting',

    description: 'menampilkan pengaturan rubrik clo',


    exits: {
        success: {
            viewTemplatePath: 'pages/admin/clo-rubric-setting'
        }
    },

    fn: async function (inputs, exits) {
        const cloRubrics = await CloRubric.find({ isDeleted: false }).populate('clo');
        const cloRubricsSorted = cloRubrics.sort((a, b) => a.clo.id - b.clo.id);
        const cloList = await Clo.find({ isDeleted: false });
        return exits.success({ cloList, cloRubrics: cloRubricsSorted });
    }
}
