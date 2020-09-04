module.exports = {
    tableName: 'ta',
    attributes: {
        taUrl: {
            type: 'string',
            required: true
        },
        taFd: {
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