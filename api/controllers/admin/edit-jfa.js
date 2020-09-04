module.exports = {
    friendlyName: 'Edit tabel jfa',

    description: 'Membuat jfa update',

    inputs: {
        id: { required: true, type: 'number' },
        name: { required: true, type: 'string' },
        abbrev: { required: true, type: 'string' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        await Jfa.update({ id: inputs.id })
            .set({
                name: inputs.name,
                abbrev: inputs.abbrev
            })
            ;
        return exits.success();
    }
}