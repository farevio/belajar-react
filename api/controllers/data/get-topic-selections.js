module.exports = {
    friendlyName: 'Get topic selections',

    description: 'Mengirim daftar topic-selection dalam json',

    inputs: {
        pageNum: {type: 'number'},
        maxRow: {type: 'number'},
        periodId: {type: 'number'},
        peminatanId: {type: 'number'},
        status: {type: 'string', isIn: ['WAITING', 'APPROVED', 'REJECTED', 'AUTO_CANCELLED']},
    },

    exits: {
        success: {}
    },

    fn: async function(inputs, exits) {
        const {
            pageNum = 1, 
            maxRow = 25, 
            periodId = await AppSetting.getPeriodId(), 
            peminatanId, 
            status
        } = inputs;
        const filteredTopics = await Topic.find({peminatan: peminatanId});
        const filteredTopicIds = filteredTopics.map(topic => topic.id);
        const topicSelections = await Promise.all(
            (await TopicSelection.find({
                period: periodId,
                status: status,
                topic: peminatanId? filteredTopicIds : undefined,
            })
            .skip((pageNum-1) * maxRow)
            .limit(maxRow)
            .populate('topic')
            .populate('group'))
        .map(async ts => {
            const group = await Group.findOne({id: ts.group.id}).populate('peminatan')
            return {...ts, group}
        }));
        return exits.success({topicSelections});
    }
}