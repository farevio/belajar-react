const bcrypt = require('bcrypt');

module.exports = {


    friendlyName: 'Signup email',
  
  
    description: `
      menguji apakah token ada di tabel mahasiswa/dosen,
      jika token valid, redirect ke set password dan membuat session
    `,
  
  
    inputs: {
      userType: {required: true, type: 'string'},
      token: {required: true, type: 'string'},
      password: {required: true, type: 'string'}
    },
  
  
    exits: {
      success: {
        responseType: 'redirect'
      },
      invalidToken: {
        statusCode: 410,
        description: 'new-password-token tidak valid atau sudah tidak berlaku lagi'
      }
    },
  
  
    fn: async function (inputs,exits) {
      const {userType, token, password} = inputs;
      if (!token) return exits.invalidToken();
      let User;
      switch (userType) {
        case 'student':
          User = Student;
          break;
        case 'lecturer':
          User = Lecturer;
          break;
        default:
          break;
      }
      const user = await User.findOne({newPasswordToken: token});
      if (!user || user.newPasswordTokenExpiresAt < Date.now()) return exits.invalidToken();
      const newhashedPassword = await bcrypt.hash(password, sails.config.custom.saltRounds);
      await User.updateOne({id: user.id})
      .set({hashedPassword: newhashedPassword, newPasswordToken: null, newPasswordTokenExpiresAt: null});
      delete this.req.session.studentId;
      delete this.req.session.lecturerId;
      this.req.session[userType+'Id'] = user.id;
      this.res.cookie('userName', user.name);
      this.res.cookie('userIdVal', user.nim || user.nik);
      this.res.cookie('userType', userType);
      return exits.success('/');
    }
    
  
  };
  