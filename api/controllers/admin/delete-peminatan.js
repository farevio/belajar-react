module.exports = {
    friendlyName: 'Delete Peminatan',

    description: 'Menghapus peminatan',

    inputs: {
        id: { required: true, type: 'number' },
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Peminatan.destroyOne({ id: inputs.id });
        return exits.success();
    }
}
