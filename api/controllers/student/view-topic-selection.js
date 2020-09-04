module.exports = {


  friendlyName: 'View topic selection',


  description: 'Display "Topic selection" page.',

  inputs: {
    optionNum: {
      type: 'ref',
      description: `Angka yang menunjukan akan menjadi
        pilihan ke berapa topik yang akan dipilih mahasiswa.
        null berarti memilih topik pilihan ke #1 dan ke #2`
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/student/topic-selection'
    }

  },


  fn: async function (inputs, exits) {
    const studentId = this.req.session.studentId;
    const student = await Student.findOne({id: studentId});
    const currentPeriodId = await AppSetting.getPeriodId();
    const group = await Group.findOne({
      period: currentPeriodId,
      students: {contains: studentId}
    });
    const currentPeriod = await Period.findOne({id: currentPeriodId})
    const topics = await Topic.find({
      peminatan: student.peminatan,
      offerPeriods: {contains: currentPeriodId}
    });
    return exits.success({
      topics,
      optionNums: inputs.optionNum,
      currentPeriod,
      group
    });

  }


};
