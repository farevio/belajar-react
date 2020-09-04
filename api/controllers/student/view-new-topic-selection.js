module.exports = {


  friendlyName: 'View new topic selection',


  description: 'Display "New topic selection" page.',


  inputs: {
    pageNum: { type: 'number' }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/student/new-topic-selection'
    }

  },


  fn: async function (inputs, exits) {
    const userId = this.req.session.studentId
    const currentPeriodId = await AppSetting.getPeriodId();
    const currentPeriod = await Period.findOne({ id: currentPeriodId });
    const currentGroupId = await Group.getIdByStudentId(userId, currentPeriodId);
    let currentGroupStudents;
    if (currentGroupId) {
      const currentGroup = await Group.findOne({ id: currentGroupId }).populate('students', {
        select: ['id']
      });
      currentGroupStudents = await Promise.all(currentGroup.students.map(async ({ id: studentId }) => {
        const populatedStudent = await Student.findOne({
          where: {
            id: studentId
          },
          select: sails.config.custom.studentPublicColumns,
        }).populate('peminatan');
        return populatedStudent
      }));

    }
    const selectedTopics = await TopicSelection.find({ group: currentGroupId, status: { '!=': 'REJECTED' } }).limit(2);
    const hasSelectedTopic = !!(selectedTopics.length && currentGroupId);
    const user = await Student.findOne({
      where: {
        id: userId
      },
      select: sails.config.custom.studentPublicColumns
    }).populate('peminatan')
    return exits.success({ user, prevGroupStudents: currentGroupStudents, currentPeriod, hasSelectedTopic });
  }


};
