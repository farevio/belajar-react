module.exports = {
    friendlyName: 'View admin',

    description: 'Menampilkan semua admin',

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/admin'
        },
    },
    fn: async function () {
        const admin = await Admin.find({ id: { '!=': 0 } });
        return exits.success({ admin });
    }
}
