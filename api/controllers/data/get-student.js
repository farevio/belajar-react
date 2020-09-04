
module.exports = {
    friendlyName: 'Get student',

    description: 'mengirim student record dalam json',

    inputs: {
        nim: { required: true, type: 'number' }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        const student = await Student.findOne({ nim: inputs.nim }).populate('peminatan');
        return exits.success({ student });
    }
}
