module.exports = {
    friendlyName: 'Edit tabel kk',

    description: 'Membuat kk update',

    inputs: {
        id: { required: true, type: 'string' },
        name: { required: true, type: 'string' },
        abbrev: { required: true, type: 'string' }
    },

    exits: {
        success: {

        }
    },

    fn: async function (inputs, exits) {
        await Kk.update({
            id: inputs.id
        }).set({
            name: inputs.name,
            abbrev: inputs.abbrev
        })
        return exits.success();
    }
}