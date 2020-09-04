module.exports = {


    friendlyName: 'View new password',
  
  
    description: `
      tampilan untuk membuat password baru atau mereset password.
    `,
  
  
    inputs: {
        userType: {required: true, type: 'string'},
        token: {required: true, type: 'string'}
    },
  
  
    exits: {
      success: {
        viewTemplatePath: 'pages/entrance/new-password'
      },
      invalidToken: {
        viewTemplatePath: 'pages/entrance/invalid-token'
      }
    },
  
  
    fn: async function (inputs,exits) {
      return exits.success();
    }
  
  
  };