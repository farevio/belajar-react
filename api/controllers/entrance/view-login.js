module.exports = {


    friendlyName: 'View new password',
  
  
    description: `
      tampilan untuk login user
    `,
  
  
    inputs: {
        
    },
  
  
    exits: {
      success: {
        viewTemplatePath: 'pages/entrance/login'
      }
    },
  
  
    fn: async function (inputs,exits) {
      return exits.success();
    }
  
  
  };
  