module.exports = async function (req, res, proceed) {
    if (req.session.lecturerId) {
      return proceed();
    }
  
    //--•
    // Otherwise, this request did not come from a logged-in user.
    await sails.helpers.clearCookies(res);
    return res.redirect('/login');
  
  };