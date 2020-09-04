module.exports = {
    friendlyName: 'View topic selections',

    description: 'Menampilkan daftar pemilihan topik pada periode aktif',

    inputs: {
        peminatanId: {type: 'number'},
        status: {type: 'string'}
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/data/topic-selections'
        }
    },

    fn: async function(inputs, exits) {
        const TOPIC_SELECTIONS_MAX_ROWS = 500;
        const filteredTopicIds = inputs.peminatanId
        ? (await Topic.find({
            where: {
                peminatan: inputs.peminatanId
            },
            select: ['id']
        })).map(topic => topic.id) : undefined;
        const currentPeriodId = await AppSetting.getPeriodId();
        const topicSelections = await TopicSelection.find({
            where: {
                topic: filteredTopicIds,
                status: inputs.status ? inputs.status : undefined,
                period: currentPeriodId
            },
            limit: TOPIC_SELECTIONS_MAX_ROWS
        });
        const currentPeriod = await Period.findOne({id: currentPeriodId});
        const peminatanList = await Peminatan.find();
        return {
            currentPeriod,
            topicSelections,
            peminatanList
        };
    }
}