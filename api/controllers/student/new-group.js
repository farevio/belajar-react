module.exports = {
    friendlyName: 'New group',
    
    description: 'Membuat kelompok yang terdiri dari sejumlah mahasiswa',

    inputs: {
        studentIds: {required: true, type: 'ref'},
    },

    exits: {
        success: {responseType: 'redirect'},
        peminatanNotMatch: {},
        memberAlreadyHasGroup: {},
    },

    fn: async function(inputs, exits) {
        const student = await Student.findOne({id: this.req.session.studentId});
        const newGroup = await Group.create({
            period: await AppSetting.getPeriodId(),
            totalStudents: inputs.studentIds.length,
            peminatan: student.peminatan
        }).fetch();
        await Group.addToCollection(newGroup.id, 'students').members(studentIds);
        return exits.success('/student/group');
    }
}