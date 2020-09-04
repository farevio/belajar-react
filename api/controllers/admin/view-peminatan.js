module.exports = {
    friendlyName: 'View peminatan',

    description: 'Menampilkan semua peminatan',

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/peminatan'
        },
    },
    fn: async function () {
        const peminatan = await Peminatan.find({ id: { '!=': 0 } });
        return exits.success({ peminatan });
    }
}
