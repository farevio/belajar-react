module.exports = {
    friendlyName: 'Edit tabel period',

    description: 'Membuat period update',

    inputs: {
        id: { required: true, type: 'number' },
        semester: { required: true, type: 'string' },
        academic_year: { required: true, type: 'string' }
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/new-period'
        }
    },

    fn: async function (inputs, exits) {
        await Period.update({ id: inputs.id }).set({
            semester: inputs.semester,
            academicYear: inputs.academic_year
        })
        return exits.success();
    }
}