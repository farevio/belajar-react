module.exports = {


    friendlyName: 'View homepage',
  
  
    description: `
      menampilkan homepage atau redirect ke page utama mahasiswa/dosen
    `,
  
  
    inputs: {
    },
  
  
    exits: {
      success: {viewTemplatePath: 'pages/entrance/login'},
      redirect: {responseType: 'redirect'}
    },
  
  
    fn: async function (inputs,exits) {
      if (this.req.session.studentId) return exits.redirect('/student/dashboard');
      if (this.req.session.lecturerId) return exits.redirect('/lecturer/topic-approvals');
      if (this.req.session.adminId) return exits.redirect('/admin/topic-archives');
      await sails.helpers.clearCookies(this.res);
      return exits.success();
    }
  
  
  };
  