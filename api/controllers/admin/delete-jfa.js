module.exports = {
    friendlyName: 'Delete JFA',

    description: 'Menghapus JFA',

    inputs: {
        id: { required: true, type: 'number' },
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Jfa.destroyOne({ id: inputs.id });
        return exits.success();
    }
}
