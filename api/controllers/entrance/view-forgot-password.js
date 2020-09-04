module.exports = {
    friendlyName: 'Forgot password',

    description: 'Menampilkan halaman lupa password',

    exits: {
        success: {viewTemplatePath: 'pages/entrance/forgot-password'}
    },

    fn: async function() {
        return {};
    }
}