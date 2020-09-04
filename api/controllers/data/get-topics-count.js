module.exports = {
    friendlyName: 'Get topics count',
    
    description: 'Mengirim jumlah record topic dengan persyaratan tertentu',

    inputs: {
        peminatanId: {type: 'number'},
        periodId: {type: 'number'},
        minQuota: {type: 'number'},
        onlySelected: {type: 'boolean'},
        onlyNotSelected: {type: 'boolean'}
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        const {
            peminatanId,
            periodId = await AppSetting.getPeriodId(),
            minQuota,
            onlySelected,
            onlyNotSelected
        } = inputs;
        const selectedTopicIds = (await TopicSelection.find({select: ['id']}))
        .map(ts => ts.topic);
        const topicsCount = await Topic.count({
            id: onlySelected
                ? selectedTopicIds : onlyNotSelected 
                ? {'nin': selectedTopicIds} : undefined,
            peminatan: peminatanId,
            period: periodId,
            quota: minQuota? {'>=': minQuota} : undefined,
            isDeleted: false
        });
        return exits.success({topicsCount});
    }
}