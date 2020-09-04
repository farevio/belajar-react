/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { action: 'account/view-homepage' },

  'GET /topics': { action: 'data/view-topics' },

  'GET /signup': { view: 'pages/entrance/signup' },
  'POST /entrance/signup': { action: 'entrance/signup' },

  'GET /login': { view: 'pages/entrance/login' },
  'POST /entrance/login': { action: 'entrance/login' },

  'POST /entrance/logout': { action: 'entrance/logout' },

  'GET /password/new': { action: 'entrance/view-new-password' },
  'POST /entrance/new-password-and-login': { action: 'entrance/new-password-and-login' },

  'GET /password/forgot': { action: 'entrance/view-forgot-password' },
  'POST /entrance/send-password-recovery': { action: 'entrance/send-password-recovery' },

  'GET /login-sso/:userType': {action: 'entrance/view-login-sso'},
  'POST /entrance/login-sso': {action: 'entrance/login-sso'},

  // ACCOUNT //

  'GET /account/password/change': { action: 'account/view-change-password' },
  'POST /account/change-password': { action: 'account/change-password' },

  // LECTURER //
  'GET /lecturer/dashboard': { action: 'lecturer/view-dashboard' },

  'GET /lecturer/topics': { action: 'lecturer/view-topics' },
  
  'GET /lecturer/topic/new': { action: 'lecturer/view-new-topic' },
  'POST /lecturer/new-topic': { action: 'lecturer/new-topic' },

  'GET /lecturer/topic/edit/:topicId': { action: 'lecturer/view-edit-topic' },
  'POST /lecturer/edit-topic': { action: 'lecturer/edit-topic' },

  'POST /lecturer/delete-topic': { action: 'lecturer/delete-topic' },

  'GET /lecturer/topic-approvals': { action: 'lecturer/view-topic-approvals' },
  'POST /lecturer/judge-topic-selections': { action: 'lecturer/judge-topic-selections' },

  'GET /lecturer/topic-title-approvals': { action: 'lecturer/view-topic-title-approvals' },
  'POST /lecturer/judge-topic-titles': { action: 'lecturer/judge-topic-titles' },


  // STUDENT //

  'GET /student/topic-selection/status': { action: 'student/view-topic-selection-status' },
  'POST /student/set-main-topic-selection': { action: 'student/set-main-topic-selection' },

  'GET /student/group': { action: 'student/view-group' },
  'POST /student/new-group': { action: 'student/new-group' },
  'POST /student/edit-group': { action: 'student/edit-group' },

  'GET /student/topic-selection/new': { action: 'student/view-new-topic-selection' },
  'POST /student/new-topic-selection': { action: 'student/new-topic-selection' },


  'GET /student/topic-title/set': { action: 'student/view-set-topic-title' },
  'POST /student/set-topic-title': { action: 'student/set-topic-title' },


  'GET /student/dashboard': { action: 'student/view-dashboard' },
  'GET /student/TAdashboard': { action: 'student/view-TAdashboard' },
  'POST /student/new-ta': { action: 'student/new-ta' },
  'POST /student/new-eprt': { action: 'student/new-eprt' },
  'POST /student/new-form': { action: 'student/new-form' },




  // ADMIN //
  'GET /admin/master-data': { action: 'admin/view-master-data' },

  'GET /admin/period/change': { action: 'admin/view-change-current-period' },
  'POST /admin/set-current-period': { action: 'admin/set-current-period' },

  'GET /admin/topic-archives': { action: 'admin/view-topic-archives' },

  'GET /admin/topic-selections': { action: 'admin/view-topic-selections' },
  'GET /admin/topic-selections-archives': { action: 'admin/view-topic-selections-archives' },

  'GET /admin/plo-setting': { action: 'admin/view-plo-setting' },
  'POST /admin/new-plo': { action: 'admin/new-plo' },
  'POST /admin/edit-plo': { action: 'admin/edit-plo' },
  'POST /admin/delete-plo': { action: 'admin/delete-plo' },

  'GET /admin/clo-setting': { action: 'admin/view-clo-setting' },
  'POST /admin/new-clo': { action: 'admin/new-clo' },
  'POST /admin/edit-clo': { action: 'admin/edit-clo' },
  'POST /admin/delete-clo': { action: 'admin/delete-clo' },

  'GET /admin/clo-rubric-setting': { action: 'admin/view-clo-rubric-setting' },
  'POST /admin/new-clo-rubric': { action: 'admin/new-clo-rubric' },
  'POST /admin/edit-clo-rubric': { action: 'admin/edit-clo-rubric' },
  'POST /admin/delete-clo-rubric': { action: 'admin/delete-clo-rubric' },

  'POST /admin/new-peminatan': { action: 'admin/new-peminatan' },
  'POST /admin/edit-peminatan': { action: 'admin/edit-peminatan' },
  'POST /admin/delete-peminatan': { action: 'admin/delete-peminatan' },

  'POST /admin/new-jfa': { action: 'admin/new-jfa' },
  'POST /admin/edit-jfa': { action: 'admin/edit-jfa' },
  'POST /admin/delete-jfa': { action: 'admin/delete-jfa' },

  'POST /admin/new-kk': { action: 'admin/new-kk' },
  'POST /admin/edit-kk': { action: 'admin/edit-kk' },
  'POST /admin/delete-kk': { action: 'admin/delete-kk' },
  'GET /admin/kk-setting': { action: 'admin/view-kk' },

  'GET /admin/data-input': { action: 'admin/view-data-input' },

  'POST /admin/new-period': { action: 'admin/new-period' },

  'POST /admin/new-app-setting': { action: 'admin/new-app-setting' },

  'POST /admin/new-lecturer': { action: 'admin/new-lecturer' },

  'POST /admin/new-admin': { action: 'admin/new-admin' },

  'POST /admin/input-csv-kk': { action: 'admin/input-csv-kk' },
  'POST /admin/input-csv-lecturer': { action: 'admin/input-csv-lecturer' },
  'POST /admin/input-csv-peminatan': { action: 'admin/input-csv-peminatan' },
  'POST /admin/input-csv-metlit': { action: 'admin/input-csv-metlit' },
  'GET /admin/data-input': { view: '/pages/admin/data-input' },

  'GET /admin/data-kelas-metlit': { action: 'admin/view-data-kelas-metlit' },

  'GET /admin/data-kelas-metlit': { action: 'admin/view-data-kelas-metlit' },

  'GET /admin/daftar-dosen': { action: 'admin/view-daftar-dosen' },

  // DATA //

  'GET /data/topic-selections': { action: 'data/get-topic-selections' },
  'GET /data/topics': { action: 'data/get-topics' },
  'GET /data/topics/count': { action: 'data/get-topics-count' },
  'GET /data/student/:nim': { action: 'data/get-student' },
  'GET /data/get-file-ta/:id': { action: 'data/get-file-ta' },
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  "/periodsForestay/*": {
    action: "period/forestay",
    forestay: {
      model: "Periods",
    }
  },

  "/mycontroller/*": {
    controller: "mycontroller",
    action: "forestay",
    forestay: {
      linkName: "MyController",
      model: "MyController",
    }
  },

};
