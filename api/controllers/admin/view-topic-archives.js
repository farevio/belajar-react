module.exports = {
    friendlyName: 'View topic archives',

    description: 'mengirim daftar topik pada tahun ajaran tertentu',

    inputs: {
        peminatanId: {
            type: 'string'
        },
        periodId: {
            type: 'string'
        }
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/admin/topic-archives'
        }
    },

    fn: async function (inputs, exits) {
        const currentPeriodId = await AppSetting.getPeriodId();
        const currentPeriod = await Period.findOne({ id: currentPeriodId });
        const MAX_ROWS = 500;
        const topics = await Topic.find({
            where: {
                peminatan: inputs.peminatanId ? inputs.peminatanId : undefined,
                period: inputs.periodId ? inputs.periodId : undefined,
                isDeleted: false
            },
            limit: MAX_ROWS
        }).populate('lecturer')
            .populate('peminatan')
            .populate('period');
        const peminatanList = await Peminatan.find();
        const periods = await Period.find();
        return exits.success({ topics, currentPeriod, peminatanList, periods });
    }
}