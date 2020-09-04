module.exports = {
    friendlyName: 'Set topic title',

    description: 'Membuat atau memperbarui topic title untuk topic-selection yang sudah disetujui',

    inputs: {
        topicTitle: { required: true, type: 'string' },
    },

    exits: {
        success: { responseType: 'redirect' },
        noApprovedTopic: {}
    },

    fn: async function (inputs, exits) {
        const studentId = this.req.session.studentId;
        const currentPeriodId = await AppSetting.getPeriodId();
        const groupId = await Group.getIdByStudentId(studentId, currentPeriodId);
        const [approvedTopicSelection] = await TopicSelection.find({
            group: groupId,
            period: currentPeriodId,
            status: 'APPROVED'
        }).sort('optionNum').limit(1);
        if (!approvedTopicSelection) {
            return exits.noApprovedTopic();
        }
        const topicId = approvedTopicSelection.topic;
        const oldTopicTitle = await Project.findOne({
            student: studentId,
            period: currentPeriodId
        });
        if (oldTopicTitle) {
            await Project.updateOne({
                id: oldTopicTitle.id
            }).set({
                topicTitle: inputs.topicTitle,
                topicTitleStatus: 'WAITING'
            });
        } else {
            await Project.create({
                student: studentId,
                topicTitle: inputs.topicTitle,
                topic: topicId,
                topicTitleStatuss: 'WAITING',
                period: currentPeriodId
            });
        }
        return exits.success('/student/topic-title/set');
    }
}
