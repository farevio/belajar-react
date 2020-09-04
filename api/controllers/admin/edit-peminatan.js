module.exports = {
    friendlyName: 'Edit tabel peminatan',

    description: 'Membuat peminatan update',

    inputs: {
        id: { required: true, type: 'number' },
        name: { required: true, type: 'string' },
        abbrev: { required: true, type: 'string' },
        kk_id: { required: true, type: 'number' }
    },

    exits: {
        success: {
            responseType: 'redirect'
        },
        failed: {}
    },

    fn: async function (inputs, exits) {
        await Peminatan.update({ id: inputs.id }).set({
            name: inputs.name,
            abbrev: inputs.abbrev,
            kk_id: inputs.kk_id
        })
        return exits.success('/admin/master-data');
    }
}