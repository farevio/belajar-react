module.exports = {
    friendlyName: 'Delete KK',

    description: 'Menghapus kk',

    inputs: {
        id: { required: true, type: 'number' },
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Kk.destroyOne({ id: inputs.id });
        return exits.success();
    }
}
