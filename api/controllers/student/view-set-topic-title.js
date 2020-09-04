module.exports = {
    friendlyName: 'View set topic title',

    description: 'Menampilkan form untuk mengisi judul topik dari topic-selection yang sudah disetujui',

    exits: {
        success: { viewTemplatePath: 'pages/student/set-topic-title' },
        noApprovedTopic: { viewTemplatePath: 'pages/student/no-approved-topic' }
    },

    fn: async function (inputs, exits) {
        const studentId = this.req.session.studentId;
        const currentPeriodId = await AppSetting.getPeriodId();
        const topicTitleRecord = await FinalProject.findOne({ student: studentId, period: currentPeriodId });
        const groupId = await Group.getIdByStudentId(studentId, currentPeriodId);
        if (!groupId) {
            return exits.noApprovedTopic();
        }
        const [approvedTopicSelection] = await TopicSelection.find({
            group: groupId,
            period: currentPeriodId,
            status: 'APPROVED'
        }).populate('topic')
            .sort('optionNum')
            .limit(1);
        if (!approvedTopicSelection) {
            return exits.noApprovedTopic();
        }
        const topic = approvedTopicSelection.topic;
        return exits.success({ topicTitleRecord, topic })
    }
}
