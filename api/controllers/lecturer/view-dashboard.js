module.exports = {
    friendlyName: 'View dashboard',

    description: 'Menampilkan dashboard mahasiswa',

    exits: {
        success: { viewTemplatePath: 'pages/lecturer/dashboard' },
        userNotFound: {}
    },

    fn: async function (inputs, exits) {
        const studentId = this.req.session.studentId;
        const student = await Student.findOne({ id: studentId })
        if (student) {
            return exits.success();

        }
        return exits.userNotFound();
    }
}