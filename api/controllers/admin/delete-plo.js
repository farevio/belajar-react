module.exports = {
    friendlyName: 'Delete plo',

    description: 'Menghapus plo',

    inputs: {
        id: { required: true, type: 'number' },
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Plo.update({ id: inputs.id }).set({ isDeleted: true });
        return exits.success();
    }
}
