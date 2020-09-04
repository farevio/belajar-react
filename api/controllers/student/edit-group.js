module.exports = {
    friendlyName: 'Edit group',

    description: 'Edit anggota dari kelompok mahasiswa yang sudah ada',

    inputs: {
        studentIds: {required: true, type: 'ref'}
    },
    
    exits: {
        success: {responseType: 'redirect'}
    },

    fn: async function(inputs, exits) {
        const studentId = this.req.session.studentId;
        const {id: groupId} = await Group.getByStudentId(studentId);
        if (inputs.studentIds.length) {
            await Group.replaceCollection(groupId, 'students').members([]);
            await Group.destroyOne({id: groupId});
        } else {
            await Group.replaceCollection(groupId, 'students').members(inputs.studentIds);
        }
        return exits.success('/student/group')
    }
}