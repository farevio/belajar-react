module.exports = {

    friendlyName: 'New topic selection',


    description: '',


    inputs: {
        studentIds: { type: 'ref' },
        topicOpt1Id: { required: true, type: 'number' },
        topicOpt2Id: { required: true, type: 'number' },
    },


    exits: {
        success: { responseType: 'redirect' },
        topicQuotaExceeded: {}
    },


    fn: async function (inputs, exits) {
        const {studentIds, topicOpt1Id, topicOpt2Id} = inputs;
        const topicOpt1 = await Topic.findOne({id: inputs.topicOpt1Id});
        const topicOpt2 = await Topic.findOne({id: inputs.topicOpt2Id});
        if (studentIds.length > topicOpt1.quota || studentIds.length > topicOpt2.quota) {
            return exits.topicQuotaExceeded()
        }
        const currentPeriodId = await AppSetting.getPeriodId();
        const student = await Student.findOne({id: this.req.session.studentId});
        const newGroup = await Group.create({
            totalStudents: studentIds.length,
            period: currentPeriodId,
            peminatan: student.peminatan
        }).fetch();
        await Group.addToCollection(newGroup.id, 'students').members(studentIds);
        const newTopicSelection1 = await TopicSelection.create({
            topic: topicOpt1.id,
            optionNum: 1,
            period: currentPeriodId,
            status: 'WAITING',
            group: newGroup.id
        });
        const newTopicSelection2 = await TopicSelection.create({
            topic: topicOpt2.id,
            optionNum: 2,
            period: currentPeriodId,
            status: 'WAITING',
            group: newGroup.id
        });
        return exits.success('/student/topic-selection/status')
    }


};
