module.exports = {
    friendlyName: 'Get topic',

    description: 'Mengirim daftar record topic',

    inputs: {
        pageNum: { type: 'number' },
        maxRow: { type: 'number' },
        peminatanId: { type: 'number' },
        periodId: { type: 'number' },
        minQuota: { type: 'number' },
        onlySelected: { type: 'boolean' },
        onlyNotSelected: { type: 'boolean' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        const {
            pageNum = 1,
            maxRow = 25,
            peminatanId,
            periodId,
            minQuota,
            onlySelected,
            onlyNotSelected
        } = inputs;
        const selectedTopicIds = onlySelected || onlyNotSelected
            ? (await TopicSelection.find({ select: ['id'] })).map(ts => ts.topic) : undefined;
        const topics = await Topic.find({
            id: onlySelected
                ? selectedTopicIds : onlyNotSelected
                    ? { 'nin': selectedTopicIds } : undefined,
            peminatan: peminatanId,
            period: periodId,
            quota: minQuota ? { '>=': minQuota } : undefined,
            isDeleted: false
        })
            .limit(maxRow)
            .skip((pageNum - 1) * maxRow)
            .populate('lecturer')
        return exits.success({ topics });
    }
}
