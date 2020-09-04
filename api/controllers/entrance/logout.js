module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user',


  inputs: {
  },


  exits: {
    success: {responseType: 'redirect'}

  },


  fn: async function (inputs, exits) {
    this.res.setHeader('Access-Control-Allow-Credentials', 'true');
    delete this.req.session.studentId;
    delete this.req.session.lecturerId;
    delete this.req.session.adminId;
    await sails.helpers.clearCookies(this.res);
    return exits.success('/');
  }


};
