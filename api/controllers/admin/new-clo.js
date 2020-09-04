module.exports = {
    friendlyName: 'New clo',

    description: 'Membuat clo baru',

    inputs: {
        ploId: { required: true, type: 'string' },
        cloCode: { required: true, type: 'string' },
        description: { required: true, type: 'string' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Clo.create({
            plo: inputs.ploId,
            cloCode: inputs.cloCode,
            description: inputs.description,
            isDeleted: false
        });
        return exits.success();
    }
}
