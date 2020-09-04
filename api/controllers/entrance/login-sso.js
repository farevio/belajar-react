const { func } = require('prop-types');
const { data } = require('jquery');

var axios = require('axios').default;

module.exports = {


  friendlyName: 'Login sso',


  description: '',


  inputs: {
    username: {type: 'string', required: true},
    password: {type: 'string', required: true},
  },


  exits: {
    redirect: {responseType: 'redirect'},
    wrongPassword: {
      statusCode: 401
    },
    wrongUsername: {
      statusCode: 401
    }
  },


  fn: async function (inputs, exits) {
    var options = {
      method: 'post',
      url: sails.config.custom.ssoLoginUrl,
      data: {
        username: inputs.username,
        password: inputs.password
      },
      headers: {
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
    };
    try {
      const loginSsoResponse = await axios(options);
      const token = loginSsoResponse.data.token;
      const getProfileConfig = {
        method: 'get',
        url: sails.config.custom.ssoProfileUrl,
        headers: { 
          'Authorization': 'Bearer ' + token,
          'content-type': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      };
      const getProfileResponse = await axios(getProfileConfig);
      const profile = getProfileResponse.data.data[0];
      const [userType, user] = await insertUserData(profile, this.req);
      delete this.req.session.studentId;
      delete this.req.session.lecturerId;
      delete this.req.session.adminId;
      this.req.session[userType.toLowerCase()+'Id'] = user.id;
      this.res.cookie('userName', user.name);
      this.res.cookie('userIdVal', user.id);
      this.res.cookie('userType', userType);
      let dashboardUrl = userType == 'student' ? '/student/dashboard' : '/lecturer/dashboard';
      return this.res.status(200).send(dashboardUrl);
    } catch (err) {
      if (err.response.status == 400 || err.response.status == 500) {
        const errorMessage = err.response.data.message;
        if (errorMessage.includes('password')) return exits.wrongPassword();
        else if (errorMessage.includes('username')) return exits.wrongUsername();
      } else {
        this.res.serverError(err);
      }
    }
    
  }


};


async function insertUserData(ssoProfile) {
  if (ssoProfile.groupname == 'STUDENT') {
    let student = await Student.findOne({nim: ssoProfile.nipnim});
    if (!student) {
      const newStudent = await Student.create({
        nim: ssoProfile.nipnim,
        name: ssoProfile.fullname,
        email: ssoProfile.email
      }).fetch();
      student = newStudent;
    }
    return ['student', student]
  } else {
    let lecturer = await Lecturer.findOne({nik: nipnim});
    if (!lecturer) {
      const newLecturer = await Lecturer.create({
        nik: ssoProfile.nipnim,
        name: ssoProfile.fullname,
        email: ssoProfile.email,
        lecturer_code: ssoProfile.lecturercode,
      }).fetch();
      lecturer = newLecturer;
    }
    return ['lecturer', lecturer]
  }
}