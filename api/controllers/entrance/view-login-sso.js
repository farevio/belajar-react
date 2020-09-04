module.exports = {


  friendlyName: 'View login sso',


  description: 'Display "Login sso" page.',

  inputs: {
    userType: {type: 'string', required: true}
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/login-sso'
    }

  },


  fn: async function (inputs) {

    // Respond with view.
    return {userType: inputs.userType};

  }


};
