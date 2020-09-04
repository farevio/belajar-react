module.exports = {
    friendlyName: 'View period',

    description: 'Menampilkan semua period',

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/period'
        },
    },
    fn: async function () {
        const period = await Period.find({ id: { '!=': 0 } });
        return exits.success({ period });
    }
}
