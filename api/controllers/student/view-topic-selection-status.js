async function populateLecturer(topicSelection) {
    const lecturer = await Lecturer.findOne({id: topicSelection.topic.lecturer});
    const populatedTopic = {...topicSelection.topic, lecturer}
    return {...topicSelection, topic: populatedTopic};
}

module.exports = {

    friendlyName: 'View topic selecition status',

    description: 'Menampilkan status topic selection, apakah disetujui atau tidak',

    inputs: {
    },

    exits: {
        success: {viewTemplatePath: 'pages/student/topic-selection-status'}
    },

    fn: async function(inputs, exits) {
        const studentId = this.req.session.studentId;
        const currentPeriodId = await AppSetting.getPeriodId();
        const currentPeriod = await Period.findOne({id: currentPeriodId});
        const groupId = await Group.getIdByStudentId(studentId, currentPeriodId);
        if (groupId){
            const group = await Group.findOne({id: groupId})
            .populate('students', {
                select: sails.config.custom.studentPublicColumns
            })
            const topicSelections = await TopicSelection.find({group: group.id})
                .populate('topic')
                .populate('period')
            let topicSelection1 = topicSelections.find(ts => ts.optionNum == 1);
            topicSelection1 = topicSelection1 ? await populateLecturer(topicSelection1) : undefined;
            let topicSelection2 = topicSelections.find(ts => ts.optionNum == 2);
            topicSelection2 = topicSelection2 ? await populateLecturer(topicSelection2) : undefined;
            return exits.success({topicSelection1, topicSelection2, currentPeriod, group});
        } 
    }
}