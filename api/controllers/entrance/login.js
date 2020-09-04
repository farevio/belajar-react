const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Login',


  description: 'Login mahasiswa/dosen.',


  inputs: {
    password: { required: true, type: 'string' },
    userIdVal: { required: true, type: 'number' }, //nik atau nim
    userType: { required: true, type: 'string' },
  },


  exits: {
    redirect: { responseType: 'redirect' },
    userNotFound: {},
    passwordNotSet: {},
    incorrectPassword: {},
    badRequest: {
      statusCode: 404
    }
  },


  fn: async function (inputs, exits) {
    this.res.setHeader('Access-Control-Allow-Credentials', 'true');
    const { password, userIdVal, userType } = inputs;
    let userIdKey, User;
    switch (userType) {
      case 'student':
        userIdKey = 'nim';
        User = Student;
        break;
      case 'lecturer':
        userIdKey = 'nik';
        User = Lecturer;
        break;
      case 'admin':
        User = Admin;
        userIdKey = 'id';
        break;
      default:
        return exits.badRequest();
    }
    const user = await User.findOne({ [userIdKey]: parseInt(userIdVal) });
    if (!user) return exits.userNotFound();
    if (!user.hashedPassword) return exits.passwordNotSet();
    //const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);
    const isPasswordMatch = password == user.hashedPassword ? true : false;
    if (!isPasswordMatch) return exits.incorrectPassword();
    delete this.req.session.studentId;
    delete this.req.session.lecturerId;
    delete this.req.session.adminId;
    this.req.session[userType + 'Id'] = user.id;
    this.res.cookie('userName', user.name);
    this.res.cookie('userIdVal', userIdVal);
    this.res.cookie('userType', userType);
    return exits.redirect('/');
  }


};
