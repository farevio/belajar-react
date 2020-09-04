module.exports = {
    friendlyName: 'Delete clo',

    description: 'Menghapus clo',

    inputs: {
        id: { required: true, type: 'number' },
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Clo.update({ id: inputs.id }).set({ isDeleted: true });
        return exits.success();
    }
}
