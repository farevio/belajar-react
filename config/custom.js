/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // baseUrl: 'https://taproposal.bubat-dev.com:1337',
  // baseUrl: 'https://5c5f7f36.ngrok.io',
  baseUrl: 'https://localhost:1337',
  ssoLoginUrl: 'https://dev-gateway.telkomuniversity.ac.id/issueauth',
  ssoProfileUrl: 'https://dev-gateway.telkomuniversity.ac.id/a277b3eca77891ca5d2f96ab73e98c06',
  mailgunApiKey: '41741e14103a33db02d6811ae3a66c4e-9dda225e-dbff7602',
  mailgunDomain: 'sandboxbcfb357597154a1b96627786c584d3e2.mailgun.org',
  saltRounds: 12,
  newPasswordTokenTtl: 24 * 60 * 60 * 1000,
  studentPublicColumns: ['id', 'nim', 'name', 'email', 'class', 'peminatan', 'kk', 'ipk'],
  lecturerPublicColumns: ['id', 'nik', 'name', 'email', 'jfa', 'peminatan', 'kk', 'lecturerCode', 'role']
  // 1 hari
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

};
