module.exports = {

    friendlyName: 'View topic selection',

    description: 'Menampilkan daftar topic yang dibuat oleh dosen tertentu dan sudah dipilih oleh mahasiswa, untuk disetujui dosen.',

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/lecturer/topic-approvals',
        }
    },

    fn: async function (inputs, exits) {
        const lecturerId = this.req.session.lecturerId;
        const lecturerTopics = await Topic.find({ lecturer: lecturerId });
        const lecturerTopicIds = lecturerTopics.map(topic => topic.id);
        const currentPeriodId = await AppSetting.getPeriodId();
        const topicSelections = await TopicSelection.find({
            topic: lecturerTopicIds,
            status: { '!=': 'AUTO_CANCELLED' },
            period: currentPeriodId
        })
            .populate('period')
            .populate('topic')
            .populate('group')
            .sort('status')
        const topicSelectionsPopulated = await Promise.all(topicSelections.map(async ts => {
            //populate 'students' property of topicSelection
            const groupPopulated = await Group.findOne({ id: ts.group.id })
                .populate('students', {
                    select: sails.config.custom.studentPublicColumns
                })
                .populate('peminatan');
            return Object.assign(ts, { group: groupPopulated });
        }));
        return exits.success({ topicSelections: topicSelectionsPopulated });

    }
}
