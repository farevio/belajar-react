module.exports = {
    friendlyName: 'New plo',

    description: 'Membuat plo baru',

    inputs: {
        ploCode: { required: true, type: 'string' },
        description: { required: true, type: 'string' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Plo.create({ ploCode: inputs.ploCode, description: inputs.description, isDeleted: false });
        return exits.success()
    }
}
