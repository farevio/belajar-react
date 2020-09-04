module.exports = {
    friendlyName: 'View topics',

    description: 'mengirim daftar topik pada tahun ajaran yang aktif',

    inputs: {
        peminatanId: {
            type: 'string'
        }
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/data/topics'
        }
    },

    fn: async function (inputs, exits) {
        const MAX_ROWS = 50;
        const currentPeriodId = await AppSetting.getPeriodId();
        const topics = await Topic.find({
            where: {
                peminatan: inputs.peminatanId ? inputs.peminatanId : undefined,
                isDeleted: false
            },
            limit: MAX_ROWS
        }).populate('lecturer')
            .populate('peminatan')
            .populate('period');
        const peminatanList = await Peminatan.find();
        const currentPeriod = await Period.findOne({ id: currentPeriodId });
        return exits.success({ topics, currentPeriod, peminatanList });
    }
}
