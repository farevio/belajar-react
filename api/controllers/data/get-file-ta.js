module.exports = {
    friendlyName: 'Download ta',

    description: '',

    inputs: {
        id: { required: true, type: 'number' }
    },

    exits: {
        success: {
            outputDescription: '',
            outputType: 'ref'
        },
        notFound: {
            responType: 'notFound'
        }
    },

    fn: async function (inputs, exits) {
        var student = Student.findOne()
        
        var ta = Ta.findOne({
            'student_id': 1
        })

        if (!ta) {
            throw 'notFound'
        }


    }
}