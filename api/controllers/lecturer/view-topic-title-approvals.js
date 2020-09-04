module.exports = {

    friendlyName: 'View topic title approvals',

    description: 'Menampilkan daftar judul topik untuk disetujui dosen',

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/lecturer/topic-title-approvals',
        }
    },

    fn: async function (inputs, exits) {
        const lecturerId = this.req.session.lecturerId;
        const lecturerTopics = await Topic.find({
            where: {
                lecturer: lecturerId, isDeleted: false
            }, select: ['id']
        });
        const lecturerTopicIds = lecturerTopics.map(topic => topic.id);
        const currentPeriodId = await AppSetting.getPeriodId();
        const topicTitles = await Project.find({ topic: lecturerTopicIds, period: currentPeriodId })
            .populate('topic')
            .populate('student');
        return exits.success({ topicTitles })
    }
}
