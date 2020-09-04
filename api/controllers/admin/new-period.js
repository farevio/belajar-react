module.exports = {
    friendlyName: 'New tabel period',

    description: 'Membuat period baru',

    inputs: {
        semester: { required: true, type: 'string' },
        academic_year: { required: true, type: 'string' }
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/new-period'
        }
    },

    fn: async function (inputs, exits) {
        let period = await Period.create({
            semester: inputs.semester,
            academicYear: inputs.academic_year
        }).fetch();
        return this.res.send({ period });
    }
}