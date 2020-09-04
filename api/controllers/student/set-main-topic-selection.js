module.exports = {
    friendlyName: 'set main topic selection',

    description: 'pilih topik utama dari kedua topic-selection yang berstatus approved',

    inputs: {
        topicSelectionId: {required: true, type: 'number'}
    },

    exits: {
        success: {responseType: 'redirect'}
    },

    fn: async function(inputs, exits) {
        await TopicSelection.updateOne({id: topicSelectionId}).set({status: 'MAIN'});
        return exits.success('/student/status');
    }
}