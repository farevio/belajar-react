module.exports = {
    friendlyName: 'Edit clo rubric',

    description: 'Mengedit rubrik clo',

    inputs: {
        id: { required: true, type: 'number' },
        cloId: { type: 'number' },
        rubricCode: { type: 'string' },
        score: { type: 'string' },
        description: { type: 'string' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await CloRubric.update({ id: inputs.id })
            .set({
                clo: inputs.cloId,
                rubricCode: inputs.cloCode,
                score: inputs.score,
                description: inputs.description,
            });
        return exits.success();
    }
}
