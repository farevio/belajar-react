module.exports = {
    friendlyName: "View edit topic",

    description: "Show edit page of final project topic",

    inputs: {
        topicId: {required: true, type: 'string'}
    },

    exits: {
        success: {
            viewTemplatePath: 'pages/lecturer/edit-topic'
        }
    },

    fn: async function(inputs, exits) {
        const peminatanList = await Peminatan.find({});
        const topic = await Topic.findOne({id: inputs.topicId});
        return exits.success({peminatanList, topic});
    }
};
