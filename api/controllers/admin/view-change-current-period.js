module.exports = {
    friendlyName: 'View change current period',

    description: 'Menampilkan halaman untuk mengubah periode yang aktif',

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/change-current-period'
        },
    },
    fn: async function () {
        const currentPeriodId = await AppSetting.getPeriodId();
        const currentPeriod = await Period.findOne({ id: currentPeriodId });
        return { currentPeriod };
    }
}
