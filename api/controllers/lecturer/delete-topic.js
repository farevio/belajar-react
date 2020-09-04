module.exports = {
    friendlyName: 'Delete topic',

    description: 'menghapus secara halus topik dosen',

    inputs: {
        topicId: {required: true, type: 'string'}
    },

    exits: {
        success: {responseType: 'redirect'},
        alreadyHasStudent: {}
    },

    fn: async function(inputs, exits) {
        const topicId = inputs.topicId;
        const currentPeriodId = await AppSetting.getPeriodId();
        const topic = await Topic.findOne({id: topicId})
        .populate('groups', {
            where: {
                period: currentPeriodId
            }
        });
        if (topic.groups.length > 0) {
            return exits.alreadyHasStudent();
        }
        await Topic.updateOne({id: inputs.topicId}).set({isDeleted: true});

        return exits.success('/lecturer/topics');
    }
}