module.exports = {
    friendlyName: 'Edit clo',

    description: 'Mengedit clo',

    inputs: {
        id: { required: true, type: 'number' },
        ploId: { type: 'number' },
        cloCode: { type: 'string' },
        description: { type: 'string' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Clo.update({ id: inputs.id })
            .set({
                plo: inputs.ploId,
                cloCode: inputs.cloCode,
                description: inputs.description,
            });
        return exits.success();
    }
}
