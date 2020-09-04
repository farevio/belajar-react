module.exports = {
    friendlyName: 'Delete clo rubric',

    description: 'Menghapus rubrik clo',

    inputs: {
        id: { required: true, type: 'number' },
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await CloRubric.update({ id: inputs.id }).set({ isDeleted: true });
        return exits.success();
    }
}
