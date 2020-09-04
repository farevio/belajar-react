module.exports = {
    tableName: 'guidance_form',
    attributes: {
        formUrl: {
            type: 'string',
            required: true
        },
        formFd: {
            type: 'string',
            required: true
        },

        owner: {
            columnName: 'student_id',
            model: 'student',
            unique: true
        }
    }
};