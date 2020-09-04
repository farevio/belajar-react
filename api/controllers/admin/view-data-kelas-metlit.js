module.exports = {
    friendlyName: 'View kelas metlit',

    description: 'Menampilkan data kelas metlit mahasiswa',

    exits: {
        success: { viewTemplatePath: 'pages/admin/data-kelas-metlit' },
        userNotFound: {}
    },

    fn: async function (inputs, exits) {
        // const studentId = this.req.session.studentId;
        // const student = await Student.findOne({ id: studentId })
        // if (student) {
        //     return exits.success();

        // }
        // return exits.userNotFound();
        return exits.success();
    }
}