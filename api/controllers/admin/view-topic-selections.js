module.exports = {
    friendlyName: 'View topic selection',

    description: 'Menampilkan daftar topic-selection pada periode aktif',

    inputs: {
        peminatanId: {
            type: 'number'
        },
        status: {
            type: 'string'
        }
    },

    exits: {
        success: { viewTemplatePath: 'pages/admin/topic-selections' }
    },

    fn: async function (inputs, exits) {
        const MAX_TOPIC_SELECTIONS_ROW = 500;
        const filteredTopicIds = (await Topic.find({
            where: {
                peminatan: inputs.peminatanId,
            },
            select: ['id']
        })).map(topic => topic.id);
        const currentPeriodId = await AppSetting.getPeriodId();
        const topicSelections = await TopicSelection.find({
            where: {
                topic: filteredTopicIds,
                status: inputs.status,
                period: currentPeriodId
            },
            limit: MAX_TOPIC_SELECTIONS_ROW
        }).populate('topic')

        .populate('period');
        const topicSelectionsPopulated = await Promise.all(
            topicSelections.map(async ts => {
                const group = await Group.findOne({id: ts.group}).populate('students');

                /*
                const students = (await GroupStudent.find({
                    where: {
                        group: ts.group
                    },
                    select: ['student']
                }).populate('student')).map(record => record.student)
                */

                const lecturer = await Lecturer.findOne({id: ts.topic.lecturer});
                return {...ts, lecturer, group};

            })
        );
        const peminatanList = await Peminatan.find();
        const periods = await Period.find();

        const currentPeriod = await Period.findOne({id: currentPeriodId});

        return exits.success({
            topicSelections: topicSelectionsPopulated,
            currentPeriod,
            periods,
            peminatanList,
        });
    }
}
