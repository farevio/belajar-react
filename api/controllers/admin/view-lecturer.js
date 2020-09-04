module.exports = {
    friendlyName: 'View dosen',

    description: 'Menampilkan semua dosen',

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/lecturer'
        },
    },
    fn: async function () {
        const lecturer = await Lecturer.find({ id: { '!=': 0 } });
        return exits.success({ lecturer });
    }
}
