module.exports = {
    friendlyName: 'View kk',

    description: 'Menampilkan halaman kk',

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/kk'
        },
    },
    fn: async function () {
        const kk = await Kk.find({ id: { '!=': 0 } });

        return this.res.send({ kk });
    }
}
