module.exports = {
    friendlyName: 'Judge topic titles',

    description: 'menyutujui atau menolak judul topik yang diajukan mahasiswa',

    inputs: {
        approvedIds: {
            type: 'ref'
        },
        rejectedIds: {
            type: 'ref'
        }
    },

    exits: {
        success: { responseType: 'redirect' }
    },

    fn: async function (inputs, exits) {
        const { approvedIds, rejectedIds } = inputs;
        await Project.update({ id: approvedIds }).set({ topicTitleStatus: 'APPROVED' });
        await Project.update({ id: rejectedIds }).set({ topicTitleStatus: 'REJECTED' });
        return exits.success('/lecturer/topic-title-approvals');
    }
}