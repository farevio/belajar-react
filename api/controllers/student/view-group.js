module.exports = {
    friendlyName: 'View group',

    description: 'Menampilkan group mahasiswa',

    exits: {
        success: {viewTemplatePath: 'pages/student/group'}
    },

    fn: async function(inputs, exits) {
        const studentId = this.req.session.studentId;
        const student = await Student.findOne({id: studentId})
        const group = await Group.getByStudentId(studentId);
        const isReadOnly = (await TopicSelection.findOne({group: group.id})) ? true : false;
        const currentPeriodId = await AppSetting.getPeriodId();
        const currentPeriod = await Period.findOne({id: currentPeriodId});
        return exits.success({group, student, currentPeriod, isReadOnly});
    }
}