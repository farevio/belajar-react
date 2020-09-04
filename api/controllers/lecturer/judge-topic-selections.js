async function approveSelection(topicSelectionId) {
    const topicSelection = await TopicSelection.updateOne({ id: topicSelectionId })
        .set({ status: 'APPROVED' });
    if (topicSelection.optionNum == 1) {
        await TopicSelection.updateOne({ group: topicSelection.group, optionNum: 2 })
            .set({ status: 'AUTO_CANCELLED' });
    }
}
async function rejectSelections(topicSelectionId) {
    const topicSelection = await TopicSelection.updateOne({ id: topicSelectionId })
        .set({ status: 'REJECTED' });
    if (topicSelection.optionNum == 1) {
        await TopicSelection.updateOne({ group: topicSelection.group, optionNum: 2, status: 'AUTO_CANCELLED' })
            .set({ status: 'WAITING' });
    }
}

module.exports = {
    friendlyName: 'Judge topic',

    description: 'menyutujui atau menolak topik selection',

    inputs: {
        approvedIds: {
            required: true,
            type: 'ref',
            description: 'topic-selection id yang disetujui'
        },
        rejectedIds: {
            required: true,
            type: 'ref',
            description: 'topic-selection id yang ditolak'
        }
    },

    exits: {
        success: { responseType: 'redirect' }
    },

    fn: async function (inputs, exits) {
        const { approvedIds, rejectedIds } = inputs;
        for (const topicSelectionId of approvedIds) {
            await approveSelection(topicSelectionId);
        }
        for (const topicSelectionId of rejectedIds) {
            await rejectSelections(topicSelectionId);
        }
        return exits.success('/lecturer/topic-approvals');
    }
}
