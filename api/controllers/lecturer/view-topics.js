module.exports = {


  friendlyName: 'View topics',


  description: 'Display topics that is created by lecturer.',


  exits: {
    success: {
      viewTemplatePath: 'pages/lecturer/topics'
    }

  },


  fn: async function (inputs,exits) {
    const topics = await Topic.find({
      lecturer: this.req.session.lecturerId,
      isDeleted: false
    }).populate('kk')
    .populate('peminatan')
    .populate('period');
    //const currentPeriodId = await AppSetting.getPeriodId();
    //const currentPeriod = await Period.findOne({id: currentPeriodId});
    return exits.success({topics});
    // Respond with view.

  }


};
