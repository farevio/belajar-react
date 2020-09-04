module.exports = {
    friendlyName: 'New plo',

    description: 'Mengedit plo',

    inputs: {
        id: { required: true, type: 'number' },
        ploCode: { required: true, type: 'string' },
        description: { required: true, type: 'string' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Plo.update({ id: inputs.id })
            .set({ ploCode: inputs.ploCode, description: inputs.description });
        return exits.success();
    }
}
