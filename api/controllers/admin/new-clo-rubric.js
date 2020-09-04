module.exports = {
    friendlyName: 'New clo rubric',

    description: 'Membuat rubrik clo baru',

    inputs: {
        cloId: { required: true, type: 'string' },
        rubricCode: { required: true, type: 'string' },
        score: { required: true, type: 'number' },
        description: { required: true, type: 'string' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await CloRubric.create({
            clo: inputs.cloId,
            rubricCode: inputs.rubricCode,
            score: inputs.score,
            description: inputs.description,
            isDeleted: false
        });
        return exits.success();
    }
}
