module.exports = {
    friendlyName: 'View topic selection archives',

    description: 'Menampilkan daftar topic-selection pada periode tertentu',

    inputs: {
        peminatanId: {
            type: 'number'
        },
        status: {
            type: 'string'
        },
        periodId: {
            type: 'number'
        },
    },

    exits: {
        success: { viewTemplatePath: 'pages/admin/topic-selections-archives' }
    },

    fn: async function (inputs, exits) {
        const MAX_TOPIC_SELECTIONS_ROW = 500;
        const filteredTopicIds = (await Topic.find({
            where: {
                peminatan: inputs.peminatanId,
            },
            select: ['id']
        })).map(topic => topic.id);
        const topicSelections = await TopicSelection.find({
            where: {
                topic: filteredTopicIds,
                status: inputs.status,
                period: inputs.periodId
            },
            limit: MAX_TOPIC_SELECTIONS_ROW
        }).populate('topic')
            .populate('period');
        const topicSelectionsPopulated = await Promise.all(
            topicSelections.map(async ts => {

                const lecturer = await Lecturer.findOne({id: ts.topic.lecturer});
                const group = await Group.findOne({id: ts.group}).populate('students');
                return {...ts, lecturer, group};

            })
        );
        const peminatanList = await Peminatan.find();
        const periods = await Period.find();

        return exits.success({topicSelections: topicSelectionsPopulated, periods, peminatanList});

    }
}
