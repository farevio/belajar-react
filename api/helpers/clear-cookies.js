module.exports = {


  friendlyName: 'Clear cookies',


  description: 'Menghapus semua cookie',


  inputs: {
    res: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: function (inputs, exits) {
    const res = inputs.res;
    res.clearCookie('userName');
    res.clearCookie('userIdVal');
    res.clearCookie('userType');
    return exits.success();
  }


};

